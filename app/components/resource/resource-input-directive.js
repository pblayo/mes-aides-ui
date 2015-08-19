angular.module('MAResources')
.directive('maResourceInput', function(MAResourcesList, MAResourcesCategoriesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-input.html',
        scope: {
            resource: '=',
            autofocus: '&'
        },
        link: function($scope, element, attrs) {
            if ($scope.autofocus())
                element.find('input')[0].focus();

            var resourceType = MAResourcesList[$scope.resource.type];

            $scope.label = resourceType.label || 'rentrées d’argent';
            $scope.category = MAResourcesCategoriesList[resourceType.category];
        }
    }
});
