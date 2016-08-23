'use strict';

angular.module('ddsCommon').directive('euros', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        replace: true,
        scope: {
            value: '@value',
        },
        templateUrl: function(element, attributes) {
            return '/components/euros/' + (element[0].tagName == 'INPUT' ? 'input' : 'text') + '.html';
        },
        link: function(scope, element, attributes, controller) {
            var formatter = new Cleave(element, {
                numeral: true,
                numeralThousandsGroupStyle: 'thousand',
                numeralDecimalMark: ',',
                delimiter: ' '
            });

            element.on('$destroy', formatter.destroy.bind(formatter));  // don't leak event listeners

            function format(value) {
                return formatter.properties.numeralFormatter.format(String(value).replace('.', ',') || '0');  // private API, always check it's still proper when updating Cleave
            }


            if (! controller) {  // we're not an input, but a simple formatter
                scope.formattedAmount = format(scope.value);
                return;
            }


            var input = element;

            controller.$formatters.push(function() {
                format(controller.$modelValue);
            });

            controller.$parsers.push(function() {
                return formatter.getRawValue();
            });

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
        }
    };
});
