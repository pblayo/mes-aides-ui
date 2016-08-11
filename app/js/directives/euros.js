'use strict';

angular.module('ddsCommon').directive('euros', function() {
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

            element.on('$destroy', formatter.destroy.bind(formatter));  // don't leak event listeners

            if (element[0].tagName != 'INPUT') {
                return element.text(formatter.properties.numeralFormatter.format(String(controller.$modelValue)));  // private API, always check it's still proper when updating Cleave)
            }

            var input = element;

            input.on('click', function() {
                this.select();
            });

            input.on('focus', function() {
                if ('0' === controller.$viewValue) {
                    controller.$setViewValue(null);
                    controller.$render();
                }
            });

            input.on('blur', function() {
                if (null === controller.$viewValue) {
                    controller.$setViewValue('0');
                    controller.$render();
                }
            });

            // formatter.setRawValue(controller.$modelValue || 0);
            // element.attr('inputmode', 'numeric');
        }
    };
});
