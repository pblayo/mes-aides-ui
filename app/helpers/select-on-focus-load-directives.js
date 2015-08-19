(function() {

angular.module('MAHelpers')
.directive('selectOnFocus', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            var select = makeSelect(element);

            element[0].addEventListener('focus', select);
            element[0].addEventListener('click', select);  // click is fired after focus, and the browser inserts the insertion caret between the focus and click events, losing selection on click
        }
    }
})
.directive('selectOnLoad', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            selectOnLoad: '&shouldActivate'
        },
        link: function(scope, element, attrs) {
            if (scope.shouldActivate)
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
