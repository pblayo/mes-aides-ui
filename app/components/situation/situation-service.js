angular.module('MASituation')
       .service('MASituation', Situation);


function Individu() {
    this.resources = [];
    /** Example data in resources:
    *
    [
        {
            type: 'revenusSalarie',   // resource type ID
            value: 1440,    // monthly value
            earnedOn: {     // String ISO month representation pointing to boolean value defining whether the value was earned for that month
                '2014-07': true,
                '2014-08': true,
                '2014-09': true,
                '2014-10': true,
                '2014-11': true,
                '2014-12': true,
                '2015-01': true,
                '2015-02': true,
                '2015-03': false,
                '2015-04': false,
                '2015-05': false,
                '2015-06': false,
                '2015-07': false
            }
        },
        {
            type: 'revenusSalarie',   // there may be several instances of the same resource type
            value: 1340,
            earnedOn: {
                '2014-07': false,
                '2014-08': false,
                '2014-09': false,
                '2014-10': false,
                '2014-11': false,
                '2014-12': false,
                '2015-01': false,
                '2015-02': false,
                '2015-03': true,
                '2015-04': true,
                '2015-05': true,
                '2015-06': true,
                '2015-07': false
            }
        },
        {
            type: 'af',
            value: 96,
            earnedOn: {
                '2014-07': true,
                '2014-08': true,
                '2014-09': true,
                '2014-10': true,
                '2014-11': true,
                '2014-12': true,
                '2015-01': true,
                '2015-02': true,
                '2015-03': false,
                '2015-04': false,
                '2015-05': false,
                '2015-06': false,
                '2015-07': false
            }
        }
    ]
    */
}

Individu.prototype.hasResources = function hasResources() {
    return this.resources.length > 0;
}

Individu.prototype.removeResource = function removeResource(resource) {
    var index = this.resources.indexOf(resource);

    if (index == -1)
        throw new ReferenceError('Asked to remove resource ' + resource + ' from individu ' + this + ', but could not find the reference to that resource.');

    this.resources.splice(index, 1);
}

Individu.prototype.addResource = function addResource(resourceType, value, earnedOn) {
    this.resources.push({
        type: resourceType,
        value: value || 0,
        earnedOn: earnedOn || {
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
        }
    });
}

function Situation() {
    this.individus = [
        new Individu()
    ];
}
