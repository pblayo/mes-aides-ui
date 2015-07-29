angular.module('MAResources')
.controller('MAResourcesInputController', function($scope, MASituation, MAResourcesList) {
    $scope.addingNewResource = false;
    $scope.resourceDefinition = function getResourceDefinition(id) {
        return MAResourcesList[id];
    }
});
