angular.module('MAResources')
.directive('maResourcesInput', function(MAResourcesCategoriesList, MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resources-input.html',
        scope: {
            individu: '='
        },
        link: function($scope) {
            $scope.categories = MAResourcesCategoriesList;
            $scope.resourceTypes = MAResourcesList.byCategory;
        },
    }
});
