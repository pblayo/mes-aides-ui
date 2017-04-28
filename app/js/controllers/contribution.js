'use strict';

angular.module('ddsApp').controller('ContributionCtrl', function($scope, droitsDescription, SituationService, ResultatService) {
    $scope.situation = SituationService.restoreLocal();

    var droitsObtenus = {};
    ResultatService.simulate($scope.situation).then(function(result) {
        droitsObtenus = result.raw.calculatedPrestations;
    });
    $scope.test = { expectedResults:[] };

    $scope.submitting = false;
    $scope.submitLabel = function() {
        return $scope.submitting ? 'Enregistrement…' : 'Enregistrer';
    };

    var prestations = [];
    for (var level in droitsDescription) {
        for (var provider in droitsDescription[level]) {
            for (var prestation in droitsDescription[level][provider].prestations) {
                prestations.push(_.merge(droitsDescription[level][provider].prestations[prestation], { code: prestation }));
            }
        }
    }

    var prefilledCode = 'aide_logement';
    var prefilledIndex = _.findIndex(prestations, function(p) { return p.code === prefilledCode; });
    $scope.test.expectedResults.push({
        expectedValue: 120.12,
        ref: prestations[prefilledIndex],
        shouldCompute: true
    });
    $scope.test.name = 'Validation test';
    $scope.test.description = 'Description du cas d\'usage\n\n[ci skip]';

    $scope.possibleValues = _.sortBy(prestations, 'label');

    function displayValueFor(droit, value) {
        if (_.isBoolean(value)) {
            return value ? 'Oui' : 'Non';
        }

        if (_.isNumber(value)) {
            return value + ' ' + ( droit.unit || '€' );
        }

        if (_.isString(value)) {
            return droit.uncomputability && droit.uncomputability[value] && droit.uncomputability[value].admin || 'raison non définie';
        }

        return value;
    }
    $scope.displayValueFor = displayValueFor;

    $scope.droitSelected = function(expectedResult) {
        expectedResult.result = droitsObtenus[expectedResult.ref.code.toLowerCase()];
        expectedResult.expectedValue = expectedResult.result;
        delete expectedResult.shouldCompute;
    };

    $scope.submit = function() {
        alert('Submit');
        /*$scope.submitting = true;
        var test = _.pick($scope.test, ['_id', 'situation', 'name', 'description', 'expectedResults', 'keywords']);
        $http.put(config.baseApiPath + '/acceptance-tests/' + test._id, test).then(function() {
            AcceptanceTestsService.launchTest(test)
            .finally(function () {
                    $state.go('index.show', { 'testId': test._id });
                });
        });//*/
    };
});
