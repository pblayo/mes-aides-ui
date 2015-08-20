angular.module('MAResources')
       .factory('MAResource', function() {
    return {
        Resource: Resource
    }
});


function Resource(type, value, earnedOn) {
    this.type = type;
    this.value = value || 0;
    this.earnedOn = earnedOn || {
        '2014-08': true,
        '2014-09': true,
        '2014-10': true,
        '2014-11': true,
        '2014-12': true,
        '2015-01': true,
        '2015-02': true,
        '2015-03': true,
        '2015-04': true,
        '2015-05': true,
        '2015-06': true,
        '2015-07': true,
        '2015-08': true,
    };
}
