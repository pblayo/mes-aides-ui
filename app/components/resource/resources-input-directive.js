angular.module('MAResources')
.directive('maResourcesInput', function(MAResourcesCategoriesList, MAResourcesList, MAResource) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resources-input.html',
        scope: {
            individu: '='
        },
        link: function($scope) {
            $scope.categories = MAResourcesCategoriesList;
            $scope.resourceTypes = MAResourcesList.byCategory;

            $scope.createResource = function(type) {
                $scope.newResource = new MAResource.Resource(type);
            }
        },
    }
});
