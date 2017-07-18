'use strict';

angular.module('ddsApp').controller('FoyerPensionsAlimentairesCtrl', function($scope, ressourceTypes, SituationService, IndividuService, RessourceService) {

    $scope.debutAnneeGlissante = moment($scope.situation.dateDeValeur).subtract('years', 1).format('MMMM YYYY');
    $scope.currentMonth = moment($scope.situation.dateDeValeur).format('MMMM YYYY');

    $scope.pensionsVersees = _.find(ressourceTypes, { id: 'pensions_alimentaires_versees_individu' });

    function createIndividuVM (individu) {
        RessourceService.setDefaultRessourceValue($scope.situation.dateDeValeur, individu, $scope.pensionsVersees);
        return {
            individu: individu,
            label: IndividuService.label(individu),
        };
    }

    var demandeur = _.find($scope.situation.individus, { role: 'demandeur' });
    var conjoint = _.find($scope.situation.individus, { role: 'conjoint' });
    $scope.individusVM = [createIndividuVM(demandeur)];
    if (conjoint) {
        $scope.individusVM.push(createIndividuVM(conjoint));
    }

    $scope.locals = {
        parentsPayPensionsAlimentaires: $scope.individusVM.reduce(function(accum, individuVM) {
            return accum || _.some(individuVM.individu.pensions_alimentaires_versees_individu);
        }, false),
    };

    function parentsPayPensionsAlimentairesUpdated() {
        if ($scope.locals.parentsPayPensionsAlimentaires) {
            $scope.individusVM.forEach(function(individuVM) {
                RessourceService.setDefaultRessourceValue($scope.situation.dateDeValeur, individuVM.individu, $scope.pensionsVersees);
            });
            return;
        }

        $scope.individusVM.forEach(function(individuVM) {
            delete individuVM.individu.pensions_alimentaires_versees_individu;
        });
    }

    $scope._parentsPayPensionsAlimentairesUpdated = parentsPayPensionsAlimentairesUpdated; // exported for testing

    $scope.$watch('locals.parentsPayPensionsAlimentaires', parentsPayPensionsAlimentairesUpdated);

    $scope.submit = function(form) {
        form.submitted = true;
        if (form.$valid) {
            $scope.$emit('pensionsAlimentaires');
        }
    };
});
