angular.module('MAResources')
.directive('maResourcesInput', function() {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resources-input.html',
        controller: 'MAResourcesInputController',
        scope: {
            individu: '='
        }
    }
});
