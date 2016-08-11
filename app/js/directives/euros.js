'use strict';

angular.module('ddsApp').directive('euros', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attributes, controller) {
            var formatter = new Cleave(element, {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalMark: ',',
                delimiter: ' '
            });

            controller.$parsers.push(formatter.getRawValue.bind(formatter));
        }
    };
});
