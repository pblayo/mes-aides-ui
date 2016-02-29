import store from '../store';
import updateErrorMessages from './update-semantic-validation';
import updateLoaders from './update-semantic-async';
import updateRecap from '../recap';
import createValidationErrorAction from './validate-common';


store.subscribe(() => {
    const state = store.getState();

    updateErrorMessages(state);
    updateLoaders(state);
    updateRecap(state);
});

if (window)
    window.onload = () => updateRecap(store.getState());


/**
 * Handles forms submission.
 * @param  {String} inputName Name of the field from which to get the value, which must also be property path of the OpenFisca situation.
 * @param  {Function<String, ?> => Action} createAction Returns a Redux action to be dispatched to the store from the input name and input value.
 */
export function bind(inputName, createAction) {
    const form = getInput(inputName).form;

    form.addEventListener('submit', event => {
        event.preventDefault();

        const input = getInput(inputName);  // need to select it again in case it is a dynamic input (e.g. radio button)

        store.dispatch(createValidationErrorAction(input) || createAction(inputName, input.value));
    });

    store.subscribe(() => {
        if (! store.getState().error)
            window.location = form.action;
    });
}

function getInput(name) {
    return document.querySelector(`input[name="${name}"]:checked`)  // support radio groups, including for browsers that don't support RadioNodeList (IE)
           || document.querySelector(`input[name="${name}"]`);
}
