angular.module('MAResources')
.directive('maResourceTypeSelect', function(MAResourcesCategoriesList, MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-type-select.html',
        scope: {
            type: '=',
            onSelect: '&'
        },
        link: function($scope) {
            $scope.categories = MAResourcesCategoriesList;
            $scope.resourceTypes = MAResourcesList.byCategory;

            $scope.setType = function setType(type) {
                for (var prop in type)
                    $scope.type[prop] = type[prop];  // can't directly assign due to data binding working by ref

                $scope.onSelect($scope.type);
            }
        },
    }
});
