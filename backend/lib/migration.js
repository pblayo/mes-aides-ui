var moment = require('moment');
var _ = require('lodash');

function getPeriods(dateDeValeur) {
    dateDeValeur = moment(dateDeValeur);
    return {
        thisMonth: dateDeValeur.format('YYYY-MM'),
        '1MonthsAgo': dateDeValeur.clone().subtract(1, 'months').format('YYYY-MM'),
        '2MonthsAgo': dateDeValeur.clone().subtract(2, 'months').format('YYYY-MM'),
        '3MonthsAgo': dateDeValeur.clone().subtract(3, 'months').format('YYYY-MM'),
        // 12-element array of the latest 12 months
        last12Months: _.map(_.range(1, 12 + 1), function(monthIndex) {
            return dateDeValeur.clone().subtract(monthIndex, 'months').format('YYYY-MM');
        }),
        lastYear: dateDeValeur.clone().subtract(1, 'years').format('YYYY'),
        anneeFiscaleReference: dateDeValeur.clone().subtract(2, 'years').format('YYYY'),
        // 12-element array of the 12 months in the année fiscale de référence
        anneeFiscaleReference12Months: _.map(_.range(12), function(monthIndex) {
            var anneeFiscaleReference = moment(dateDeValeur.clone().subtract(2, 'years').year(), 'YYYY');
            return anneeFiscaleReference.clone().add(monthIndex, 'months').format('YYYY-MM');
        })
    };
}


function getStatutOccupationLogement(logement) {
    var statusOccupationMap = {
        'proprietaireprimoaccedant': 1,
        'proprietaire': 2,
        'locatairenonmeuble': 4,
        'locatairemeublehotel': 5,
        'heberge': 6,
        'locatairefoyer': 7,
        'sansDomicile' : 8
    };
    var statusOccupationId = logement.type;
    if (logement.type == 'proprietaire' && logement.primoAccedant) {
        statusOccupationId = 'proprietaireprimoaccedant';
    } else if (logement.type == 'locataire' && logement.locationType) {
        statusOccupationId += logement.locationType;
    }
    return statusOccupationMap[statusOccupationId];
}

exports.ressourcesYearMoins2Captured = function ressourcesYearMoins2Captured(situation) {
    var categoriesRncIds = [
        'salaire_imposable_ym2',
        'chomage_imposable',
        'retraite_imposable',
        'frais_reels',
        'pensions_alimentaires_percues_ym2',
        'pensions_alimentaires_versees',
    ];
    return (typeof situation.rfr == 'number') || situation.individus.some(function(individu) {
            return individu.ressources && individu.ressources.some(function(ressource) {
                return categoriesRncIds.indexOf(ressource.type) >= 0;
            });
        });
};

exports.persistedSituationPretransformationUpdate = function persistedSituationPretransformationUpdate(situation) {
    if (situation.ressourcesYearMoins2Captured && (! this.ressourcesYearMoins2Captured(situation))) {
        var ym2 = moment(situation.dateDeValeur).subtract(2, 'years').format('YYYY');

        situation.individus[0].ressources.push({
            montant: 0,
            periode: ym2,
            type: 'frais_reels',
        });
    }
};

exports.migratePersistedSituation = function(sourceSituation) {
    var situation = {
        _id: sourceSituation._id,
        dateDeValeur: sourceSituation.dateDeValeur,
    };
    var periods = getPeriods(situation.dateDeValeur);
    var ressourceMapping = {
        pensions_alimentaires_percues_ym2: 'pensions_alimentaires_percues',
        pensions_alimentaires_versees_ym2: 'pensions_alimentaires_versees',
        salaire_imposable_ym2: 'salaire_imposable',
    };

    var individuPropertyMapping = {
        assPreconditionRemplie: 'ass_precondition_remplie',
        autoEntrepreneurActiviteType: 'tns_auto_entrepreneur_type_activite',
        dateDeNaissance: 'date_naissance',
        echelonBourse: 'echelon_bourse',
        enceinte: 'enceinte',
        firstName: 'firstName',
        gardeAlternee: 'garde_alternee',
        habiteChezParents: 'habite_chez_parents',
        id: 'id',
        microEntrepriseActiviteType: 'tns_micro_entreprise_type_activite',
        nationalite: 'nationalite',
        perteAutonomie: 'perte_autonomie',
        place: 'enfant_place',
        role: 'role',
        scolarite: 'scolarite',
        specificSituations: 'specificSituations',
        tauxIncapacite: 'tauxIncapacite',
        tns_autres_revenus_type_activite: 'tns_autres_revenus_type_activite',
    };
    situation.individus = sourceSituation.individus.map(function(sourceIndividu) {
        var individu = {
            id: sourceIndividu.id || sourceIndividu._id,
        };
        Object.keys(individuPropertyMapping).forEach(function(previousPropertyName) {
            if (sourceIndividu[previousPropertyName] !== undefined) {
                individu[individuPropertyMapping[previousPropertyName]] = _.cloneDeep(sourceIndividu[previousPropertyName]);
            }
        });
        individu.enfant_a_charge = {};
        individu.enfant_a_charge[moment(situation.dateDeValeur).format('YYYY')]= sourceIndividu.aCharge || (! sourceIndividu.fiscalementIndependant);
        individu.boursier = sourceIndividu.boursier || sourceIndividu.echelonBourse >= 0;

        if (sourceIndividu.statutMarital) {
            var statutMaritalMapping = {
                seul: 2,
                mariage: 1,
                pacs: 5,
                union_libre: 2
            };
            if (statutMaritalMapping[sourceIndividu.statutMarital]) {
                individu.statut_marital = statutMaritalMapping[sourceIndividu.statutMarital];
            }
        }

        var declaredRessources = {};
        sourceIndividu.ressources.forEach(function(sourceRessource) {
            var ressourceName = sourceRessource.type;
            if (ressourceMapping[ressourceName]) {
                ressourceName = ressourceMapping[ressourceName];
            }
            declaredRessources[ressourceName] = {};
            individu[ressourceName] = individu[ressourceName] || {};
            if (typeof individu[ressourceName] === 'object') {
                individu[ressourceName][sourceRessource.periode] = individu[ressourceName][sourceRessource.periode] || 0;
                individu[ressourceName][sourceRessource.periode] = individu[ressourceName][sourceRessource.periode] + sourceRessource.montant;
            }

        });

        Object.keys(declaredRessources).forEach(function(ressourceName) {
            var ressourceLastMonth = individu[ressourceName][periods['1MonthsAgo']];
            if (ressourceLastMonth && ! _.includes(sourceIndividu.interruptedRessources, ressourceName)) {
                individu[ressourceName][periods.thisMonth] = ressourceLastMonth;
            }
        });

        delete individu.autresRevenusTns;
        delete individu.caAutresRevenusTns;

        return individu;
    });

    situation.foyer_fiscal = {};
    if (typeof sourceSituation.rfr == 'number') {
        situation.foyer_fiscal.rfr = {};
        situation.foyer_fiscal.rfr[periods.anneeFiscaleReference] = sourceSituation.rfr;
    }

    situation.menage = {
        code_postal: sourceSituation.logement.adresse.codePostal,
        coloc: sourceSituation.logement.colocation,
        depcom: sourceSituation.logement.adresse.codeInsee,
        loyer: sourceSituation.logement.loyer,
        logement_chambre: sourceSituation.logement.isChambre,
        participation_frais: sourceSituation.logement.participationFrais,
        statut_occupation_logement: getStatutOccupationLogement(sourceSituation.logement),
    };

    if (sourceSituation.logement.charges !== undefined && sourceSituation.logement.charges !== null) {
        situation.menage.charges_locatives = sourceSituation.logement.charges;
    }

    situation.famille = {
        parisien : sourceSituation.logement.inhabitantForThreeYearsOutOfLastFive,
        proprietaire_proche_famille: sourceSituation.logement.membreFamilleProprietaire,
        rsa_isolement_recent: sourceSituation.individus[0].isolementRecent,
    };

    var patrimoineMap = {
        epargneSansRevenus: 'epargne_non_remuneree',
        valeurLocativeImmoNonLoue: 'valeur_locative_immo_non_loue',
        valeurLocativeTerrainNonLoue: 'valeur_locative_terrains_non_loue',
    };
    var sourcePatrimoine = sourceSituation.patrimoine || {};
    Object.keys(patrimoineMap).forEach(function(patrimoineFieldName) {
        situation.individus[0][patrimoineMap[patrimoineFieldName]] = { '2012-01': sourcePatrimoine[patrimoineFieldName] || 0 };
    });
    situation.individus[0].interets_epargne_sur_livrets = { '2012-01' : 0.01 * (sourcePatrimoine.epargneSurLivret || 0) };

    var patrimoineValues = _.values(patrimoineMap);
    patrimoineValues.push('interets_epargne_sur_livrets');

    situation.individus.slice(1).forEach(function(individu) {
        patrimoineValues.forEach(function(patrimoineFieldName) {
            individu[patrimoineFieldName] = { '2012-01': 0 };
        });
    });

    // Prevent undefined values that fail at YAML serialization
    [situation.menage, situation.famille].forEach(function(subject) {
        _.forEach(subject, function(value, key) {
            if (value === undefined) {
                delete subject[key];
            }
        });
    });

    return situation;
};