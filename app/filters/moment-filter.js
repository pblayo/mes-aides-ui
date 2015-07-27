angular.module('MAResources')
.filter('formatDate', function() {
    /** `outputFormat` is optional, but recommended.
    * See https://github.com/moment/moment/issues/1407.
    */
    return function(value, inputFormat, outputFormat) {
        var source = (outputFormat
                      ? moment(value, inputFormat)
                      : moment(new Date(value)));

        return source.format(outputFormat || inputFormat);
    };
});
