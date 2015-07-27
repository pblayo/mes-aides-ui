angular.module('MAResources')
.controller('MAResourcesInputController', function($scope, MASituation, MAResourcesList) {
    $scope.resources = MASituation.individus[$scope.individu()].resources;

    $scope.resourceDefinition = function getResourceDefinition(id) {
        return MAResourcesList[id];
    }
});
