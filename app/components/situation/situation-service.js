angular.module('MASituation')
       .service('MASituation', Situation);


function Individu() {
    this.resources = {
        revenusSalarie: [
            {
                value: 1440,
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
            },
            {
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
            }
        ],
        af: [
            {
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
            },
            {
                value: 120,
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
                    '2015-07': true
                }
            }
        ]
    };
}

Individu.prototype.removeResource = function removeResource(id, index) {
    this.resources[id].splice(index, 1);
}

function Situation() {
    this.individus = [
        new Individu()
    ];
}
