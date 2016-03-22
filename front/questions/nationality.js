export function format(ressortissant_eee) {
    return ressortissant_eee == 'true';
}

export function route(state) {
    if (! state.openfiscaSituation.individus[0].ressortissant_eee)
        return 'titre-sejour';
}
