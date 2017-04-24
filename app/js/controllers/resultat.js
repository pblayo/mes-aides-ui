'use strict';

angular.module('ddsApp').controller('ResultatCtrl', function($scope, $rootScope, $window, $http, $state, $stateParams, $timeout, SituationService, ResultatService, droitsDescription, $analytics) {

    $scope.error = false;
    $scope.awaitingResults = true;

    function loadSituation() {
        if ($stateParams.situationId) { // If we want the result page for an already existing situation.
            return SituationService.restoreRemote($stateParams.situationId);
        } else {
            return SituationService.save($scope.situation).then(function() {
                return SituationService.restoreRemote($scope.situation._id);
            });
        }
    }

    loadSituation()
    .then(function(situation) {
        $scope.situation = situation;
        return ResultatService.simulate($scope.situation);
        })
    .then(function(droits) {
        $scope.droits = droits.droitsEligibles;
        $scope.droitsInjectes = droits.droitsInjectes;
        $scope.noDroits = _.isEmpty($scope.droits.prestationsNationales) && _.isEmpty($scope.droits.partenairesLocaux);
    })
    .catch(function(error) {
        $scope.error = (error && error.data) || error || true;
        $scope.encodedError = encodeURIComponent($scope.error);
        $scope.encodedUserAgent = encodeURIComponent(window.navigator.userAgent);
        $analytics.eventTrack('error', { label: $scope.error });
    })
    .finally(function() {
        $scope.awaitingResults = false;
    });

    $scope.issueTitle = 'Titre - timestamp: ' + Date.now();
    $scope.issueDescription = 'Super description !';

    $scope.yearMoins2 = moment($scope.situation.dateDeValeur).subtract('years', 2).format('YYYY');
    $scope.debutPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('years', 1).format('MMMM YYYY');
    $scope.finPeriode = moment($scope.situation.dateDeValeur).startOf('month').subtract('months', 1).format('MMMM YYYY');
    $scope.ressourcesYearMoins2Captured = SituationService.ressourcesYearMoins2Captured($scope.situation);

    $scope.getPartenaireLocalLabel = function(partenaireId) {
        var partenaire = droitsDescription.partenairesLocaux[partenaireId];
        return partenaire.prefix + ' <strong>' + partenaire.label + '</strong>';
    };

    $scope.shouldDisplayImpactInfo = function(partenaireId) {
        return ! droitsDescription.partenairesLocaux[partenaireId].interactionWithNationalPrestationCalculated;
    };

    function generateExpectedResults() {
        // Merge national and local prestations into a flat object compatible with ludwig.
        var flatPrestations = _.merge.apply(
            null,
            _.values($scope.droits.partenairesLocaux).concat($scope.droits.prestationsNationales)
        );

        return _.map(flatPrestations, function(droit, id) {
            return {
                code: id,
                expectedValue: droit.montant
            };
        });
    }

    function generateTestFileContent() {
        var name = $scope.issueTitle;
        var description = $scope.issueDescription;
        var content = {
            name: name,
            description: description,
            scenario: $scope.situation || {},
            expectedResults: generateExpectedResults()
        };
        return JSON.stringify(content, null, 2);
    }

    function updateTestFileContent() {
        $scope.issueFileContent = generateTestFileContent();
    }

    $scope.$watch('issueTitle', updateTestFileContent, true);
    $scope.$watch('issueDescription', updateTestFileContent, true);

    $scope.createTest = function() {
        $http.post('api/public/acceptance-tests', {
            expectedResults: generateExpectedResults(),
            scenario: { situationId: $scope.situation._id }
        }).success(function(data) {
            $window.location.href = '/tests/' + data._id + '/edit';
        }).error(function(data) {
            $window.alert(data.error.apiError);
        });
    };
});
