angular.module('MAResources')
.directive('maResourceInput', function($timeout, MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-input.html',
        scope: {
            resource: '='
        },
        link: function($scope, element, attrs) {
            $scope.label = MAResourcesList.getLabelOf($scope.resource.type) || 'revenus';

            var amountInput = element[0].querySelector('input[type="number"]');
            amountInput.focus();
            $timeout(amountInput.setSelectionRange.bind(amountInput, 0, 99));  // wrapping in timeout due to https://code.google.com/p/chromium/issues/detail?id=32865
        }
    }
});
