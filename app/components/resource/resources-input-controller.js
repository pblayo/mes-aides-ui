angular.module('MAResources')
.controller('MAResourcesInputController', function($scope, MASituation, MAResourcesList) {
    $scope.resourceDefinition = function getResourceDefinition(id) {
        return MAResourcesList[id];
    }
});
