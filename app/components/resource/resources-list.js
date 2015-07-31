angular.module('MAResources').constant('MAResourcesList', (function() {
    var result = {
        revenusSalarie: {
            id: 'revenusSalarie',
            label: 'Salaires',
            synonyms: 'Travail, Paie, Primes',
            category: 'Revenus d’activité',
        },
        stage: {
            id: 'stage',
            label: 'Stage',
            synonyms: 'Gratification, Stagiaire',
            category: 'Revenus d’activité',
        },
        revenusStageFormationPro: {
            id: 'revenusStageFormationPro',
            label: 'Formation professionnelle',
            synonyms: 'Stage',
            category: 'Revenus d’activité',
        },

        allocationsChomage: {
            id: 'allocationsChomage',
            label: 'Chômage',
            synonyms: 'ARE, Allocation de Retour à l\'Emploi, Chomage, Pôle Emploi, Pole Emploi',
            category: 'Allocations',
        },
        allocationSecurisationPro: {
            id: 'allocationSecurisationPro',
            label: 'Allocation de sécurisation professionnelle',
            category: 'Allocations',
        },
        primeRepriseActivite: {
            id: 'primeRepriseActivite',
            label: 'Prime de reprise d’activité',
            synonyms: 'Prime forfaitaire mensuelle pour la reprise d’activité',
            category: 'Allocations',
        },
        allocationLogement: {
            id: 'allocationLogement',
            label: 'Aides au logement',
            synonyms: 'APL, ALS, ALF',
            category: 'Allocations',
        },
        af: {
            id: 'af',
            label: 'Allocations familiales',
            synonyms: 'AF',
            category: 'Allocations',
        },
        cf: {
            id: 'cf',
            label: 'Complément familial',
            synonyms: 'CF',
            category: 'Allocations',
        },
        asf: {
            id: 'asf',
            label: 'Allocation de soutien familial',
            synonyms: 'ASF',
            category: 'Allocations',
        },
        rsa: {
            id: 'rsa',
            label: 'Revenu de solidarité active',
            synonyms: 'RSA',
            category: 'Allocations',
        },
        aspa: {
            id: 'aspa',
            label: 'Allocation de solidarité aux personnes âgées',
            synonyms: 'ASPA',
            category: 'Allocations',
        },
        asi: {
            id: 'asi',
            label: 'Allocation supplémentaire d’invalidité',
            synonyms: 'ASI',
            category: 'Allocations',
        },
        ass: {
            id: 'ass',
            label: 'Allocation de solidarité spécifique',
            synonyms: 'ASS',
            category: 'Allocations',
        },
        aah: {
            id: 'aah',
            label: 'Allocation adulte handicapé',
            synonyms: 'AAH',
            category: 'Allocations',
        },
        paje: {
            id: 'paje',
            label: 'Prestation d’accueil du jeune enfant',
            synonyms: 'PAJE',
            category: 'Allocations',
        },
        clca: {
            id: 'clca',
            label: 'Complément de libre choix d’activité',
            synonyms: 'CLCA',
            category: 'Allocations',
        },
        prepare: {
            id: 'prepare',
            label: 'Prestation partagée d’éducation de l’enfant',
            synonyms: 'PreParE',
            category: 'Allocations',
        },

        indJourMaternite: {
            id: 'indJourMaternite',
            label: 'Indemnités de maternité, paternité, adoption',
            category: 'Indemnités',
        },
        indJourMaladie: {
            id: 'indJourMaladie',
            label: 'Indemnités maladie',
            category: 'Indemnités',
        },
        indJourMaladieProf: {
            id: 'indJourMaladieProf',
            label: 'Indemnités maladie professionnelle',
            category: 'Indemnités',
        },
        indJourAccidentDuTravail: {
            id: 'indJourAccidentDuTravail',
            label: 'Indemnités d’accident du travail',
            category: 'Indemnités',
        },
        indChomagePartiel: {
            id: 'indChomagePartiel',
            label: 'Indemnités d’activité partielle',
            category: 'Indemnités',
        },
        indVolontariat: {
            id: 'indVolontariat',
            label: 'Indemnités de volontariat',
            category: 'Indemnités',
        },
        dedommagementAmiante: {
            id: 'dedommagementAmiante',
            label: 'Dédommagement aux victimes de l’amiante',
            category: 'Indemnités',
        },

        pensionsAlimentaires: {
            id: 'pensionsAlimentaires',
            label: 'Pensions alimentaires',
            category: 'Pensions',
        },
        pensionsAlimentairesVersees: {
            id: 'pensionsAlimentairesVersees',
            label: 'Pensions alimentaires versées',
            category: 'Pensions',
        },
        prestationCompensatoire: {
            id: 'prestationCompensatoire',
            label: 'Prestation compensatoire',
            synonyms: 'Séparation, Separation',
            category: 'Pensions',
        },
        pensionsRetraitesRentes: {
            id: 'pensionsRetraitesRentes',
            label: 'Retraites et rentes',
            synonyms: 'Réversion, Reversion',
            category: 'Pensions',
        },
        retraiteCombattant: {
            id: 'retraiteCombattant',
            label: 'Retraite du combattant',
            category: 'Pensions',
        },
        pensionsInvalidite: {
            id: 'pensionsInvalidite',
            label: 'Pensions d’invalidité',
            category: 'Pensions',
        },

        caMicroEntreprise: {
            id: 'caMicroEntreprise',
            label: 'Micro-entreprise',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'Revenus professionnels non salariés',
        },
        caAutoEntrepreneur: {
            id: 'caAutoEntrepreneur',
            label: 'Auto-entrepreneur',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'Revenus professionnels non salariés',
        },
        revenusAgricolesTns: {
            id: 'revenusAgricolesTns',
            label: 'Exploitant agricole',
            synonyms: 'Chiffre d\'affaire, CA, Exploitation, Agriculteur',
            category: 'Revenus professionnels non salariés',
        },
        autresRevenusTns: {
            id: 'autresRevenusTns',
            label: 'Profession libérale, entrepreneur',
            synonyms: 'Chiffre d\'affaire, CA, Prestation, Facturation',
            category: 'Revenus professionnels non salariés',
        },

        bourseEnseignementSup: {
            id: 'bourseEnseignementSup',
            label: 'Bourses de l’enseignement supérieur',
            category: 'Autres',
        },
        bourseRecherche: {
            id: 'bourseRecherche',
            label: 'Bourse de recherche',
            category: 'Autres',
        },
        gainsExceptionnels: {
            id: 'gainsExceptionnels',
            label: 'Gains exceptionnels (dons, gains aux jeux, héritage)',
            category: 'Autres',
        },
    };

    Object.defineProperty(result, 'getLabelOf', {
        enumerable: false,
        value: function getLabelOf(id) {
            return id && result[id] && result[id].label;
        }
    });

    Object.freeze(result);

    return result;
})());
