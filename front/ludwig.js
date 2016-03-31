import YAML from 'yamljs';

import '../node_modules/sgmap.ludwig/dist/bundle.js';
import store from './store';


const ludwig = new window.Ludwig({
    repoUrl: 'https://github.com/sgmap/openfisca-france/',
    template: `Précisez si ce test provient :
- [ ] d'un dossier réel
- [ ] du résultat d'une simulation sur un outil métier

NE MODIFIEZ PAS LE CONTENU CI-DESSOUS
---

`,
    prefix: 'test_',
    web:{
        acceptedTestsPath:'/tree/prod/openfisca_france/tests/mes-aides.gouv.fr',
        addPath:'/new/prod/openfisca_france/tests/mes-aides.gouv.fr',
        suggestedTestsPath:'/pulls?utf8=✓&q=is%3Apr+is%3Aopen',
    },
});

document.getElementById('createTest').addEventListener('click', event => {
    const url = ludwig.generateSuggestionURL(
        store.getState().openfiscaSituation,
        store.getState().openfiscaSituation,
        (template, actual, expected) => {
            const demoString = YAML.stringify(expected, 20, 2).slice(0, 300);  // work around URI size limit for demo purposes
            return `${template}${demoString}[more content missing…]`;
        }
    );

    window.location = url;
});

document.getElementById('showTests').href = ludwig.acceptedTestsURL();
