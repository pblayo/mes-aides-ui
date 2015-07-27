angular.module('MAResources')
.controller('MAResourcesInputController', function($scope, MASituation) {
    $scope.resources = MASituation.individus[$scope.individu()].resources;
});
