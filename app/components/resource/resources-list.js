angular.module('MAResources').constant('MAResourcesList', (function() {
    var result = {
        revenusSalarie: {
            id: 'revenusSalarie',
            label: 'Salaires',
            synonyms: 'Travail, Paie',
            category: 'activite',
        },
        primes: {
            id: 'primes',
            label: 'Primes',
            category: 'activite',
        },
        stage: {
            id: 'stage',
            label: 'Stage',
            synonyms: 'Gratification, Stagiaire',
            category: 'activite',
        },
        revenusStageFormationPro: {
            id: 'revenusStageFormationPro',
            label: 'Formation professionnelle',
            synonyms: 'Stage',
            category: 'activite',
        },
        caMicroEntreprise: {
            id: 'caMicroEntreprise',
            label: 'Micro-entreprise',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'activite',
        },
        caAutoEntrepreneur: {
            id: 'caAutoEntrepreneur',
            label: 'Auto-entrepreneur',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'activite',
        },
        revenusAgricolesTns: {
            id: 'revenusAgricolesTns',
            label: 'Exploitant agricole',
            synonyms: 'Chiffre d\'affaire, CA, Exploitation, Agriculteur',
            category: 'activite',
        },
        autresRevenusTns: {
            id: 'autresRevenusTns',
            label: 'Profession libérale, entrepreneur',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'activite',
        },

        allocationsChomage: {
            id: 'allocationsChomage',
            label: 'Chômage',
            synonyms: 'ARE, Allocation de Retour à l\'Emploi, Chomage, Pôle Emploi, Pole Emploi',
            category: 'allocation',
        },
        allocationSecurisationPro: {
            id: 'allocationSecurisationPro',
            label: 'Allocation de sécurisation professionnelle',
            category: 'allocation',
        },
        primeRepriseActivite: {
            id: 'primeRepriseActivite',
            label: 'Prime de reprise d’activité',
            synonyms: 'Prime forfaitaire mensuelle pour la reprise d’activité',
            category: 'allocation',
        },
        allocationLogement: {
            id: 'allocationLogement',
            label: 'Aides au logement',
            synonyms: 'APL, ALS, ALF',
            category: 'allocation',
        },
        af: {
            id: 'af',
            label: 'Allocations familiales',
            synonyms: 'AF',
            category: 'allocation',
        },
        cf: {
            id: 'cf',
            label: 'Complément familial',
            synonyms: 'CF',
            category: 'allocation',
        },
        asf: {
            id: 'asf',
            label: 'Allocation de soutien familial',
            synonyms: 'ASF',
            category: 'allocation',
        },
        rsa: {
            id: 'rsa',
            label: 'Revenu de solidarité active',
            synonyms: 'RSA',
            category: 'allocation',
        },
        aspa: {
            id: 'aspa',
            label: 'Allocation de solidarité aux personnes âgées',
            synonyms: 'ASPA',
            category: 'allocation',
        },
        asi: {
            id: 'asi',
            label: 'Allocation supplémentaire d’invalidité',
            synonyms: 'ASI',
            category: 'allocation',
        },
        ass: {
            id: 'ass',
            label: 'Allocation de solidarité spécifique',
            synonyms: 'ASS',
            category: 'allocation',
        },
        aah: {
            id: 'aah',
            label: 'Allocation adulte handicapé',
            synonyms: 'AAH',
            category: 'allocation',
        },
        paje: {
            id: 'paje',
            label: 'Prestation d’accueil du jeune enfant',
            synonyms: 'PAJE',
            category: 'allocation',
        },
        clca: {
            id: 'clca',
            label: 'Complément de libre choix d’activité',
            synonyms: 'CLCA',
            category: 'allocation',
        },
        prepare: {
            id: 'prepare',
            label: 'Prestation partagée d’éducation de l’enfant',
            synonyms: 'PreParE',
            category: 'allocation',
        },

        indJourMaternite: {
            id: 'indJourMaternite',
            label: 'Indemnités de maternité, paternité, adoption',
            category: 'indemnite',
        },
        indJourMaladie: {
            id: 'indJourMaladie',
            label: 'Indemnités maladie',
            category: 'indemnite',
        },
        indJourMaladieProf: {
            id: 'indJourMaladieProf',
            label: 'Indemnités maladie professionnelle',
            category: 'indemnite',
        },
        indJourAccidentDuTravail: {
            id: 'indJourAccidentDuTravail',
            label: 'Indemnités d’accident du travail',
            category: 'indemnite',
        },
        indChomagePartiel: {
            id: 'indChomagePartiel',
            label: 'Indemnités d’activité partielle',
            category: 'indemnite',
        },
        indVolontariat: {
            id: 'indVolontariat',
            label: 'Indemnités de volontariat',
            category: 'indemnite',
        },
        dedommagementAmiante: {
            id: 'dedommagementAmiante',
            label: 'Dédommagement aux victimes de l’amiante',
            category: 'indemnite',
        },

        pensionsAlimentaires: {
            id: 'pensionsAlimentaires',
            label: 'Pensions alimentaires',
            category: 'pension',
        },
        prestationCompensatoire: {
            id: 'prestationCompensatoire',
            label: 'Prestation compensatoire',
            synonyms: 'Séparation, Separation',
            category: 'pension',
        },
        pensionsInvalidite: {
            id: 'pensionsInvalidite',
            label: 'Pensions d’invalidité',
            category: 'pension',
        },

        pensionsRetraitesRentes: {
            id: 'pensionsRetraitesRentes',
            label: 'Retraites et rentes',
            synonyms: 'Réversion, Reversion',
            category: 'retraite',
        },
        retraiteCombattant: {
            id: 'retraiteCombattant',
            label: 'Retraite du combattant',
            category: 'retraite',
        },

        bourseEnseignementSup: {
            id: 'bourseEnseignementSup',
            label: 'Bourses de l’enseignement supérieur',
            category: 'autre',
        },
        bourseRecherche: {
            id: 'bourseRecherche',
            label: 'Bourse de recherche',
            category: 'autre',
        },
        gainsExceptionnels: {
            id: 'gainsExceptionnels',
            label: 'Gains exceptionnels (dons, gains aux jeux, héritage)',
            category: 'autre',
        },

        autre: {
            id: 'autre',
            label: 'Autre',
            category: 'autre',
        },
    };

    Object.defineProperties(result, {
        getLabelOf: {
            value: function getLabelOf(id) {
                return id && result[id] && result[id].label;
            }
        },

        byCategory: {
            get: function() {
                return _.groupBy(result, 'category');

                var byCategory = {};

                angular.forEach(result, function(type) {
                    byCategory[type.category] = byCategory[type.category] || [];
                    byCategory[type.category].push(type);
                });

                return byCategory;
            }
        }
    });

    Object.freeze(result);

    return result;
})());
