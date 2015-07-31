(function() {

angular.module('MAHelpers')
.directive('selectOnFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element[0].focus(makeSelect(element));
        }
    }
})
.directive('selectOnLoad', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(makeSelect(element));  // wrapping in timeout due to https://code.google.com/p/chromium/issues/detail?id=32865
        }
    }
});


function makeSelect(jqliteWrapper) {
    return function select() {
        var element = jqliteWrapper[0];

        element.setSelectionRange(0, element.value.length);
    }
}

})();
