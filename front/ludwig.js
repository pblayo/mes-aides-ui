import YAML from 'yamljs';

import '../node_modules/sgmap.ludwig/dist/ludwig.js';
import store from './store';


const ludwig = new window.Ludwig({
    repo: 'sgmap/openfisca-france',
    branch: 'prod',
    prefix: 'test_',
});

document.getElementById('createTest').addEventListener('click', event => {
    const url = ludwig.generateSuggestionURL(
        store.getState().openfiscaSituation,
        store.getState().openfiscaSituation,
        (actual, expected) => {
            const demoString = YAML.stringify(expected, 20, 2).slice(0, 300);  // work around URI size limit for demo purposes
            return `Précisez si ce test provient :
- [ ] d'un dossier réel
- [ ] du résultat d'une simulation sur un outil métier

NE MODIFIEZ PAS LE CONTENU CI-DESSOUS
---
${demoString}
[more content missing…]
`;
        }
    );

    window.location = url;
});

document.getElementById('showTests').href = ludwig.acceptedTestsURL();
