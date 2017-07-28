/* 1 */
var situation = {
    "_id" : "592d092160ca897f11fed126",
    "__v" : 0,
    "dateDeValeur" : "2017-05-30T05:54:41.479Z",
    "individus" : [
        {
            "_id" : "592d092160ca897f11fed127",
            "aCharge" : false,
            "autoEntrepreneurActiviteType" : "bic",
            "dateDeNaissance" : "1963-09-22T00:00:00.000Z",
            "echelonBourse" : -1,
            "fiscalementIndependant" : true,
            "id" : "592d092160ca897f11fed127",
            "interruptedRessources" : [],
            "microEntrepriseActiviteType" : "bic",
            "nationalite" : "fr",
            "perteAutonomie" : false,
            "place" : false,
            "ressources" : [
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2017-04",
                    "montant" : 717.45,
                    "_id" : "592d092160ca897f11fed133"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2017-03",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed132"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2017-02",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed131"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2017-01",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed130"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-12",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12f"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-11",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12e"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-10",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12d"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-09",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12c"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-08",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12b"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-07",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed12a"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-06",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed129"
                },
                {
                    "type" : "pensions_invalidite",
                    "periode" : "2016-05",
                    "montant" : 714.58,
                    "_id" : "592d092160ca897f11fed128"
                }
            ],
            "role" : "demandeur",
            "specificSituations" : [
                "handicap"
            ],
            "tauxIncapacite" : "moins80",
            "tns_autres_revenus_type_activite" : "bic"
        }
    ],
    "logement" : {
        "inhabitantForThreeYearsOutOfLastFive" : true,
        "type" : "locataire",
        "loyer" : 278.21,
        "colocation" : false,
        "membreFamilleProprietaire" : false,
        "locationType" : "nonmeuble",
        "isChambre" : false,
        "charges" : 136.34,
        "adresse" : {
            "codeInsee" : "75105",
            "codePostal" : "75005"
        }
    },
    "ressourcesYearMoins2Captured" : false,
    "status" : "test",
    "token" : "qob7OPoKH3wECkw2XnGK_cBHd1UW70wXpQjeVU4kwILBAbDBTzI7Wo3hfW-XjJAw"
};

var subject = require('../../../backend/lib/openfisca/test');
var expect = require('expect');

describe('openfisca generateYAMLTest', function() {
    var details = {
        name: 'default name',
        description: 'default description',
        output_variables: {
            valueOne: 1,
        },
        absolute_error_margin: 0.1,
    };
    var result = subject.generateYAMLTest(details, situation);

    it('generates a non empty string', function() {
        expect(result).toBeTruthy();
    });
});
