/**
 * Hide and show validation messages based on given state.
 * @param  {Object} state Redux state describing the current error.
 */
export default function updateErrorMessages(state) {
    [ ...document.querySelectorAll('[data-for]') ].forEach(message => {
        const shouldBeVisible = state.error && (state.error.id == message.attributes['data-for'].value);

        message.className = shouldBeVisible ? 'ui form error' : '';
    });
}
