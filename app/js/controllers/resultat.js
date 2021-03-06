'use strict';

angular.module('ddsApp').controller('ResultatCtrl', function($scope, $rootScope, $window, $http, $state, $stateParams, $timeout, SituationService, CityService, ResultatService, droitsDescription, $analytics) {
    $scope.awaitingResults = false;
    $scope.error = false;
    $scope.warning = false;

    function loadSituation() {
        if ($stateParams.situationId) { // If we want the result page for an already existing situation.
            return $scope.restoreRemoteSituation($stateParams.situationId);
        } else {
            return $scope.persistLocalSituation();
        }
    }

    function triggerEvaluation() {
        loadSituation()
        .then(function(situation) {
            $scope.awaitingResults = true;
            return situation;
        }).then(ResultatService.simulate)
        .then(function(droits) {
            $scope.droits = droits.droitsEligibles;
            $scope.droitsInjectes = droits.droitsInjectes;
            $scope.noDroits = _.isEmpty($scope.droits.prestationsNationales) && _.isEmpty($scope.droits.partenairesLocaux);
        })
        .catch(function(error) {
            $scope.error = JSON.stringify((error && error.data), null, 2);
            $scope.encodedError = encodeURIComponent($scope.error);
            $scope.encodedUserAgent = encodeURIComponent(window.navigator.userAgent);
            $analytics.eventTrack('error', { label: $scope.error || $scope.situation._id });
        })
        .finally(function() {
            $scope.awaitingResults = false;

            $scope.yearMoins2 = moment($scope.situation.dateDeValeur).subtract('years', 2).format('YYYY');
            $scope.debutPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('years', 1).format('MMMM YYYY');
            $scope.finPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('months', 1).format('MMMM YYYY');
            $scope.ressourcesYearMoins2Captured = SituationService.ressourcesYearMoins2Captured($scope.situation);
            $scope.isPatrimoineCaptured = function() {
                return angular.isDefined(SituationService.hasPatrimoine($scope.situation));
            };
        });
    }

    if ($stateParams.situationId || SituationService.passSanityCheck($scope.situation)) {
        triggerEvaluation();
    } else {
        $scope.warning = true;
    }

    $scope.createTest = function() {
        // Merge national and local prestations into a flat object compatible with ludwig.
        var flatPrestations = _.merge.apply(
            null,
            _.values($scope.droits.partenairesLocaux).concat($scope.droits.prestationsNationales)
        );

        var expectedResults = _.map(flatPrestations, function(droit, id) {
            return {
                code: id,
                expectedValue: droit.montant
            };
        });

        $http.post('api/public/acceptance-tests', {
            expectedResults: expectedResults,
            scenario: { situationId: $scope.situation._id }
        }).success(function(data) {
            $window.location.href = '/tests/' + data._id + '/edit';
        }).error(function(data) {
            $window.alert(data.error.apiError);
        });
    };

    function normalizeEtablissement(etablissementData) {
        var etablissement = etablissementData.Organisme;

        etablissement.Adresse = (etablissement.Adresse && etablissement.Adresse[0]) || {};
        etablissement.Adresse.CodePostal = etablissement.Adresse.CodePostal[0];
        etablissement.Adresse.NomCommune = etablissement.Adresse.NomCommune[0];
        etablissement.Nom = etablissement.Nom[0];
        etablissement['CoordonnéesNum'] = etablissement['CoordonnéesNum'][0];
        etablissement['CoordonnéesNum'].Url = etablissement['CoordonnéesNum'].Url[0];

        if (etablissement['CoordonnéesNum'].Url == 'https://www.maisondeservicesaupublic.fr') {
            delete etablissement['CoordonnéesNum'].Url;
        }

        if (etablissement.Ouverture) {
            etablissement.Ouverture = etablissement.Ouverture[0];
            var mapping = {
                lundi: 1,
                mardi: 2,
                mercredi: 3,
                jeudi: 4,
                vendredi: 5,
                samedi: 6,
                dimanche: 7
            };
            etablissement.Ouverture.PlageJ = _.sortBy(etablissement.Ouverture.PlageJ, function(plage) {
                return mapping[plage.$['début']];
            });
        }

        return etablissement;
    }

    $scope.extractHHMM = function(dateString) {
        return dateString.slice(0,5);
    };

    CityService
    .getCities($scope.situation.menage.code_postal)
    .then(function(cities) { return _.find(cities, { codeInsee: $scope.situation.menage.depcom }); })
    .then(function(city) { return $http.get('https://etablissements-publics.api.gouv.fr/v2/communes/' + city.codeInsee + '/msap'); })
    .then(function(response) { return response.data; }, function(error) { return []; })
    .then(function(etablissements) {
        $scope.etablissements = etablissements.map(normalizeEtablissement);
    });
});
