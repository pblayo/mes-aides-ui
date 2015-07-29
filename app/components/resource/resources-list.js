angular.module('MAResources').constant('MAResourcesList', (function() {
    var result = {
        revenusSalarie: {
            id: 'revenusSalarie',
            label: 'Salaires, primes',
            category: 'Revenus d’activité',
        },
        stage: {
            id: 'stage',
            label: 'Rémunération de stage',
            category: 'Revenus d’activité',
        },
        revenusStageFormationPro: {
            id: 'revenusStageFormationPro',
            label: 'Revenus de stage de formation professionnelle',
            category: 'Revenus d’activité',
        },

        allocationsChomage: {
            id: 'allocationsChomage',
            label: 'Allocation chômage (ARE)',
            category: 'Allocations',
        },
        allocationSecurisationPro: {
            id: 'allocationSecurisationPro',
            label: 'Allocation de sécurisation professionnelle',
            category: 'Allocations',
        },
        primeRepriseActivite: {
            id: 'primeRepriseActivite',
            label: 'Prime forfaitaire mensuelle pour la reprise d’activité',
            category: 'Allocations',
        },
        allocationLogement: {
            id: 'allocationLogement',
            label: 'Aides au logement (APL, ALS, ALF)',
            category: 'Allocations',
        },
        af: {
            id: 'af',
            label: 'Allocations familiales',
            category: 'Allocations',
        },
        cf: {
            id: 'cf',
            label: 'Complément familial (CF)',
            category: 'Allocations',
        },
        asf: {
            id: 'asf',
            label: 'Allocation de soutien familial (ASF)',
            category: 'Allocations',
        },
        rsa: {
            id: 'rsa',
            label: 'Revenu de solidarité active (RSA)',
            category: 'Allocations',
        },
        aspa: {
            id: 'aspa',
            label: 'Allocation de solidarité aux personnes âgées (ASPA)',
            category: 'Allocations',
        },
        asi: {
            id: 'asi',
            label: 'Allocation supplémentaire d’invalidité (ASI)',
            category: 'Allocations',
        },
        ass: {
            id: 'ass',
            label: 'Allocation de solidarité spécifique (ASS)',
            category: 'Allocations',
        },
        aah: {
            id: 'aah',
            label: 'Allocation adulte handicapé (AAH)',
            category: 'Allocations',
        },
        paje: {
            id: 'paje',
            label: 'Prestation d’accueil du jeune enfant (PAJE) - Allocation de base',
            category: 'Allocations',
        },
        clca: {
            id: 'clca',
            label: 'Complément de libre choix d’activité (CLCA)',
            category: 'Allocations',
        },
        prepare: {
            id: 'prepare',
            label: 'Prestation partagée d’éducation de l’enfant (PreParE)',
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
            label: 'Prestation compensatoire (suite à séparation)',
            category: 'Pensions',
        },
        pensionsRetraitesRentes: {
            id: 'pensionsRetraitesRentes',
            label: 'Retraite (y compris reversion), rentes',
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
            category: 'Revenus professionnels non salariés',
        },
        caAutoEntrepreneur: {
            id: 'caAutoEntrepreneur',
            label: 'Auto-entrepreneur',
            category: 'Revenus professionnels non salariés',
        },
        revenusAgricolesTns: {
            id: 'revenusAgricolesTns',
            label: 'Exploitant agricole',
            category: 'Revenus professionnels non salariés',
        },
        autresRevenusTns: {
            id: 'autresRevenusTns',
            label: 'Profession libérale, entrepreneur',
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
            if (! id)
                return;

            if (! result[id])
                return 'Autre';

            return result[id].label;
        }
    });

    Object.freeze(result);

    return result;
})());
