'use strict';

angular.module('ddsApp').controller('ContributionCtrl', function($scope, droitsDescription, SituationService, ResultatService) {
    /*var droitsObtenus = {};
    ResultatService.simulate($scope.situation).then(function(result) {
        droitsObtenus = result.raw.calculatedPrestations;
    });//*/
    var result = {"raw":{"injectedPrestations":["aide_logement","rsa"],"calculatedPrestations":{"aspa":0,"asi":0,"acs":0,"cmu_c":true,"apl":0,"als":0,"alf":550.34,"aide_logement_non_calculable":"","af":361.53,"rsa_non_calculable":"","asf":301.73,"cf":203.07,"ass":0,"paje_base":0,"bourse_college":720,"bourse_lycee":0,"paris_logement_familles":0,"paris_forfait_famille":305,"paris_logement_psol":0,"paris_logement":0,"paris_logement_plfm":150,"paris_logement_aspeh":0,"paris_energie_famille":275,"paris_complement_sante":0,"adpa":0,"rennes_metropole_transport":0,"aah":0,"aah_non_calculable":"","ppa":0}},"droitsEligibles":{"prestationsNationales":{"cmu_c":{"label":"Couverture maladie universelle complémentaire","shortLabel":"CMU-C","description":"La couverture maladie universelle complémentaire (CMU-C) est une protection complémentaire santé (mutuelle) gratuite. Elle est destinée aux personnes qui ont de faibles ressources et résident en France de manière stable et régulière. Une fois attribuée, la CMU-C est accordée pour un an.","conditions":["Résider <abbr title=\"Métropole, Guadeloupe, Guyane, Martinique ou Réunion\">en France</abbr> depuis plus de 3 mois."],"link":"https://www.service-public.fr/particuliers/vosdroits/F10027","form":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12504.do","forms":{"general":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12504.do","msa":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12504.do","rsi":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12504.do"},"montant":true,"imgSrc":"logo_assurance_maladie.png"},"af":{"label":"Allocations familiales","shortLabel":"AF","description":"Les allocations familiales sont réservées aux personnes ayant au moins 2 enfants de moins de 20 ans à charge. Le montant des prestations dépend des ressources, du nombre d’enfants à charge et de leurs âges. Elles sont versées tous les mois. Dans les DOM, les allocations sont versées à partir du premier enfant.","conditions":["Résider <abbr title=\"Métropole, Guadeloupe, Guyane, Martinique ou Réunion\">en France</abbr> plus de <abbr title=\"180 jours, potentiellement discontinus\">6 mois</abbr> cette année."],"link":"https://www.service-public.fr/particuliers/vosdroits/F13213","form":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationsfamilialesouchangementdesituation","forms":{"caf":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationsfamilialesouchangementdesituation","msa":"http://www.msa.fr/lfr/documents/11566/132715/D%C3%A9claration+de+situation+pour+les+prestations+familiales+et+aides+au+logement.pdf"},"isBaseRessourcesYearMoins2":true,"montant":361.53,"imgSrc":"logo_caf.png"},"cf":{"label":"Complément familial","shortLabel":"CF","description":"Le complément familial s’ajoute aux allocations familiales à partir du troisième enfant à charge âgé de plus de 3 ans et de moins de 21 ans. Il est destiné aux familles ayant de faibles ressources. Dans les DOM, le complément familial concerne tous les enfants à charge âgés entre 3 et 5 ans.","link":"https://www.service-public.fr/particuliers/vosdroits/F13214","form":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationsfamilialesouchangementdesituation","forms":{"caf":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationsfamilialesouchangementdesituation","msa":"http://www.msa.fr/lfr/documents/11566/132715/D%C3%A9claration+de+situation+pour+les+prestations+familiales+et+aides+au+logement.pdf"},"isBaseRessourcesYearMoins2":true,"montant":203.07,"imgSrc":"logo_caf.png"},"asf":{"label":"Allocation de soutien familial","shortLabel":"ASF","description":"L’allocation de soutien familial (ASF) est destinée soit au parent qui élève seul un enfant non reconnu, privé de l’aide d’un parent ou dont l’autre parent est décédé, soit à la personne seule ou en couple qui recueille un enfant. L’ASF est versée par la Caf ou la MSA tous les mois.","conditions":["Ne pas toucher l’intégralité d’une pension alimentaire qui vous aurait été attribuée par une décision de justice, ou que cette pension soit d’un montant inférieur à celui de l’ASF."],"link":"https://www.caf.fr/aides-et-services/s-informer-sur-les-aides/solidarite-et-insertion/l-allocation-de-soutien-familial-asf-0","form":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationdesoutienfamilial/!ut/p/a1/","forms":{"caf":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/allocationdesoutienfamilial/!ut/p/a1/","msa":"http://www.msa.fr/lfr/documents/11566/48472/Demande+d%27allocation+de+soutien+familial+%28ASF%29.pdf"},"montant":301.73,"imgSrc":"logo_caf.png"},"bourse_college":{"isMontantAnnuel":true,"label":"Bourse de collège","shortLabel":"Bourse col","description":"La bourse de collège est une aide destinée à favoriser la scolarité des collégiens. Elle est versée aux familles ayant de faibles ressources. Son montant dépend du nombre d’enfants à charge. Vous devez déposer votre dossier de demande entre la rentrée scolaire et la fin du mois de septembre.","link":"https://www.service-public.fr/particuliers/vosdroits/F984","form":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12539.do","forms":{"2016-17":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_12539.do"},"isBaseRessourcesYearMoins2":true,"montant":720,"imgSrc":"logo_education_nationale.png"}},"partenairesLocaux":{"paris":{"paris_forfait_famille":{"isMontantAnnuel":true,"label":"Paris Forfait Famille","shortLabel":"PFF","description":"Paris Forfait Famille est une aide destinée aux familles nombreuses avec au moins trois enfants à charge. Elle peut se cumuler avec l’Allocation de Soutien aux Parents d’Enfants Handicapés. L’aide est accordée pour une durée maximale d’un an. Elle peut être renouvelée en présentant un nouveau dossier.","link":"http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-forfait-famille_2","form":"https://api-site.paris.fr/images/74809","isBaseRessourcesYearMoins2":false,"roundToNearest10":false,"montant":305,"imgSrc":"logo_paris.png"},"paris_logement_plfm":{"label":"Paris Logement Familles Monoparentales","shortLabel":"PLFM","description":"L’allocation Paris Logement Famille Monoparentale est destinée aux parents seuls, ayant un ou plusieurs enfants à charge. Elle leur permet de mieux supporter leurs dépenses de logement. Elle est ouverte aux locataires, aux propriétaires et aux personnes accédant à la propriété. L’aide est accordée pour un an. Elle peut être renouvelée en présentant un nouveau dossier.","conditions":["Avoir demandé le versement des aides logement auxquelles vous avez droit auprès de la CAF.","Ne toucher aucune autre prestation logement de la part de la mairie de Paris ou du département."],"link":"http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-logement-famille-monoparentale_5","form":"https://api-site.paris.fr/images/72423","isBaseRessourcesYearMoins2":false,"roundToNearest10":false,"montant":150,"imgSrc":"logo_paris.png"},"paris_energie_famille":{"isMontantAnnuel":true,"label":"Paris Énergie Familles","shortLabel":"PEF","description":"L’allocation Paris Énergie Famille est réservée aux familles ayant un ou plusieurs enfants à charge, sous condition d’imposition. Cette aide permet de les soutenir dans leurs dépenses d’électricité et/ou de gaz. Paris Énergie Famille est directement versée aux fournisseurs d’énergie. L’aide est accordée pour un an. Elle peut être renouvelée en présentant un nouveau dossier.","link":"http://www.paris.fr/services-et-infos-pratiques/aides-et-demarches/aides-allocations-et-subventions/simulateur-mes-aides-gouv-fr-pour-la-ville-de-paris-3626#paris-energie-famille_8","form":"https://api-site.paris.fr/images/154764.pdf","isBaseRessourcesYearMoins2":false,"roundToNearest10":false,"montant":275,"imgSrc":"logo_paris.png"}}}},"droitsInjectes":[{"label":"Aides au logement","shortLabel":"AL","description":"Les aides au logement regroupent trois aides différentes non cumulables : l’aide personnalisée au logement (Apl), l’allocation de logement familiale (Alf) et l’allocation de logement sociale (Als). Elles concernent les personnes ayant de faibles ressources, locataires ou remboursant le prêt de leur résidence principale. Elles sont versées par la Caf ou la MSA.","conditions":["Résider au moins 8 mois par an dans le logement que vous avez décrit.","Le logement doit être <a target=\"_blank\" rel=\"noopener\" href=\"https://www.caf.fr/aides-et-services/connaitre-vos-droits-selon-votre-situation/vous-louez-ou-vous-achetez-un-logement/vous-occupez-un-logement-insalubre-ou-non-decent\" title=\"9 mètres carrés par personne, fenêtre, WC, eau potable, électricité\" >décent</a>."],"link":"https://www.service-public.fr/particuliers/vosdroits/N20360","teleservice":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/demanderlaideaulogement/","teleservices":{"caf":"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/faireunedemandedeprestation/demanderlaideaulogement/","msa":"http://www.msa.fr/lfr/c/bookmarks/open_entry?entryId=98643"},"isBaseRessourcesYearMoins2":true,"uncomputability":{"primo_accedant":{"reason":"vous êtes <abbr title=\"Non propriétaire de votre résidence principale dans les deux années précédant l’achat de votre résidence actuelle\">primo-accédant</abbr> à la propriété de votre résidence principale","solution":"Le <a target=\"_blank\" rel=\"noopener\" href=\"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/estimervosdroits/lelogement\">simulateur de la CAF</a> pourra estimer vos droits sur la base de la valeur de votre bien."},"locataire_foyer":{"reason":"vous logez dans un foyer","solution":"Le <a target=\"_blank\" rel=\"noopener\" href=\"https://wwwd.caf.fr/wps/portal/caffr/aidesetservices/lesservicesenligne/estimervosdroits/lelogement\">simulateur de la CAF</a> vous donnera des estimations selon les différentes conventions possibles de votre foyer."}}},{"label":"Revenu de solidarité active","shortLabel":"RSA","description":"Le revenu de solidarité active (RSA) assure aux personnes sans ressources un niveau minimum de revenu variable selon la composition du foyer. Le RSA, le RSA parent isolé et le RSA jeunes parents sont simulés. Financé par les conseils départementaux, son versement se fait à travers la Caf ou la MSA.","conditions":["Signer un <a target=\"_blank\" rel=\"noopener\" href=\"http://social-sante.gouv.fr/affaires-sociales/lutte-contre-l-exclusion/droits-et-aides/le-revenu-de-solidarite-active-rsa/article/quels-sont-les-droits-et-devoirs-des-beneficiaires-du-rsa\" title=\"Détails sur les droits et devoirs des bénéficiaires du RSA\">contrat d’engagement réciproque</a> avec votre département.","Résider en France plus de 9 mois par an.","Si vous êtes ressortissant·e d’un pays de l’UE, de l’EEE ou Suisse, résider en France depuis plus de 3 mois.","Si vous êtes ressortissant·e d’un autre pays, résider en France depuis plus de 5 ans."],"link":"https://www.service-public.fr/particuliers/vosdroits/N19775","form":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_15481.do","forms":{"caf":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_15481.do","msa":"https://www.formulaires.modernisation.gouv.fr/gf/cerfa_15481.do"},"uncomputability":{"tns":{"reason":"vous avez des revenus en tant qu’indépendant·e","solution":"Vous pouvez demander à bénéficier du RSA, mais c’est le président de votre conseil départemental qui <a target=\"_blank\" rel=\"noopener\" title=\"Article R262-23 du code de l’action sociale\" href=\"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000028251799&cidTexte=LEGITEXT000006074069\">décidera</a> de la manière dont vos revenus non salariés impacteront le montant de votre aide."},"conjoint_tns":{"reason":"votre conjoint·e a des revenus en tant qu’indépendant·e","solution":"Vous pouvez demander à bénéficier du RSA, mais c’est le président de votre conseil départemental qui <a target=\"_blank\" rel=\"noopener\" title=\"Article R262-23 du code de l’action sociale\" href=\"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000028251799&cidTexte=LEGITEXT000006074069\">décidera</a> de la manière dont les revenus non salariés de votre conjoint·e impacteront le montant de votre aide."}}}]};
    var droitsObtenus = result.raw.calculatedPrestations;
    $scope.test = { expectedResults: [] };

    $scope.submitting = false;
    $scope.submitLabel = function() {
        return $scope.submitting ? 'Enregistrement…' : 'Enregistrer';
    };

    var prestations = [];
    for (var level in droitsDescription) {
        for (var provider in droitsDescription[level]) {
            for (var prestation in droitsDescription[level][provider].prestations) {
                prestations.push(_.merge(droitsDescription[level][provider].prestations[prestation], { code: prestation }));
            }
        }
    }

    var prefilledCode = 'aide_logement';
    var prefilledIndex = _.findIndex(prestations, function(p) { return p.code === prefilledCode; });
    $scope.test.expectedResults.push({
        expectedValue: 120.12,
        ref: prestations[prefilledIndex],
        shouldCompute: true
    });
    $scope.test.name = 'Validation test';
    $scope.test.description = 'Description du cas d\'usage\n\n[ci skip]';

    $scope.possibleValues = _.sortBy(prestations, 'label');

    function displayValueFor(droit, value) {
        if (_.isBoolean(value)) {
            return value ? 'Oui' : 'Non';
        }

        if (_.isNumber(value)) {
            return value + ' ' + ( droit.unit || '€' );
        }

        if (_.isString(value)) {
            return droit.uncomputability && droit.uncomputability[value] && droit.uncomputability[value].admin || 'raison non définie';
        }

        return value;
    }

    function generateState(test) {
        return JSON.stringify({
            name: test.name,
            description: test.description,
            scenario: SituationService.restoreLocal(),
            expectedResults: test.expectedResults.map(function(result) {
                return  {
                    code: result.ref.code,
                    expectedValue: result.expectedValue
                };
            })
        });
    }

    function setState() {
        $scope.generatedState = generateState($scope.test);
    }
    setState();

    $scope.$watch('test', setState, true);
    $scope.displayValueFor = displayValueFor;

    $scope.droitSelected = function(expectedResult) {
        expectedResult.result = droitsObtenus[expectedResult.ref.code.toLowerCase()];
        expectedResult.expectedValue = expectedResult.result;
        delete expectedResult.shouldCompute;
    };


});
