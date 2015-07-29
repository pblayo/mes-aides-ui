angular.module('MAResources')
.directive('maResourceInput', function(MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-input.html',
        scope: {
            resource: '='
        },
        link: function($scope, element, attrs) {
            $scope.label = MAResourcesList[$scope.resource.type].label;
        }
    }
});
