'use strict';

angular.module('ddsApp').controller('ContributionCtrl', function($scope, $http, $window, droitsDescription) {
    $scope.droitPromise.then(function(droits) {
        $scope.aidesObtenues = droits.droitsEligibles.prestationsNationales;
    });

    function generateAideList() {
        var aides = [];
        for (var level in droitsDescription) {
            for (var provider in droitsDescription[level]) {
                var basicProvider = _.assign({}, droitsDescription[level][provider]);
                delete basicProvider.prestations;

                for (var prestation in droitsDescription[level][provider].prestations) {
                    aides.push(_.assign({ code: prestation, provider: basicProvider }, droitsDescription[level][provider].prestations[prestation]));
                }
            }
        }
        return aides;
    }

    function extractExpectation(result, aide) {
        if (aide.shouldCompute === 'false') {
            result[aide.code + '_non_calculable'] = aide.uncomputabilityReason;
            return result;
        }

        if (aide.type === 'bool') {
            result[aide.code] = Boolean(parseInt(aide.shouldBeEligible));
            return result;
        }

        result[aide.code] = parseInt(aide.montant);
        return result;
    }

    var aides = generateAideList();
    var defaultName = 'Exemple : Les bourses de l‘enseignement supérieur ne sont pas prises en compte dans les ressources';
    var defaultDescription = 'Résultat attendu, règle de gestion testée et éventuellement origine de l’écart avec le résultat de la simulation.';

    $scope.suggestion = {
        description: defaultDescription,
        name: defaultName,
        selectedAides: [],
    };
    $scope.aides = aides;
    $scope.aideOptions = $scope.aides.slice();

    $scope.addAide = function() {
        $scope.suggestion.selectedAides.push(_.assign({}, $scope.suggestion.selectedAide));

        var index = _.findIndex($scope.aideOptions, function(aide) { return aide.code === $scope.suggestion.selectedAide.code; });
        $scope.aideOptions.splice(index, 1);
        $scope.suggestion.selectedAide = null;
    };

    $scope.removeAide = function(indexToRemove) {
        var removedAide = $scope.suggestion.selectedAides[indexToRemove];
        $scope.suggestion.selectedAides.splice(indexToRemove, 1);

        var index = _.findIndex($scope.aides, function(aide) { return aide.code === removedAide.code; });
        $scope.aideOptions.push($scope.aides[index]);
    };

    function manageError(error) {
        $scope.suggestion.error = JSON.stringify((error && error.data), null, 2);
        $scope.suggestion.encodedError = encodeURIComponent($scope.suggestion.error);
        $scope.sendingSuggestion = false;
    }

    $scope.createLudwigTest = function(form) {
        $scope.sendingSuggestion = true;
        $http.post('api/situations/' + $scope.situation._id + '/openfisca-test',
        {
            description: $scope.suggestion.description,
            expectedResults: $scope.suggestion.selectedAides.reduce(extractExpectation, {}),
            name: $scope.suggestion.name,
        })
        .then(function(response) {
            return $http.post('ludwig/anon/tests/suggestions',
            {
                description: $scope.suggestion.name + '\n\n' + $scope.suggestion.description,
                state: response.data,
                title: $scope.suggestion.name,
            }).then(function(response) {
                $scope.sendingSuggestion = false;
                $scope.suggestion.result = response.data;
            }, manageError);
        }, manageError);
    };
});
