angular.module('MASituation')
       .service('MASituation', Situation);


function Individu() {
    this.resources = {};
}

function Situation() {
    this.individus = [
        new Individu()
    ];
}
