angular.module('MAResources')
.directive('maResourceInput', function() {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-input.html',
        scope: {
            resource: '='
        }
    }
});
