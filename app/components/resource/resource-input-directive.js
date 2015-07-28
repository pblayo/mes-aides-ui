angular.module('MAResources')
.directive('maResourceInput', function(MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-input.html',
        scope: {
            resourceId: '&',
            data: '='
        },
        link: function($scope, element, attrs) {
            $scope.label = MAResourcesList[$scope.resourceId()].label;
        }
    }
});
