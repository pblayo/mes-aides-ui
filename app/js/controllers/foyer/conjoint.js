'use strict';

angular.module('ddsApp').controller('FoyerConjointCtrl', function($scope, $state, SituationService) {
    var demandeur = SituationService.getDemandeur($scope.situation);
    var hasChildren = SituationService.hasEnfant($scope.situation);
    var famille = $scope.famille = $scope.situation.famille;

    $scope.locals = {};

    var isFirstView = demandeur.statut_marital == undefined;
    if (isFirstView) {
        $scope.locals.isInCouple = undefined;
    } else {
        $scope.locals.isInCouple = Boolean(SituationService.getConjoint($scope.situation));
    }

    function shouldDisplaySubmit() {
        return ($scope.locals.isInCouple == false) && (! hasChildren) && (! isFirstView);
    }
    $scope.shouldDisplaySubmit = shouldDisplaySubmit;
    $scope.shouldDisplaySubmitInitially = $scope.locals.isInCouple == false;

    function captureIsolement() {
        return $scope.locals.isInCouple == false && hasChildren;
    }
    $scope.captureIsolement = captureIsolement;

    function isInCoupleUpdated() {
        if ($scope.locals.isInCouple == false) {
            demandeur.statut_marital = 2; // Célibataire et union libre
        } else {
            delete $scope.famille.rsa_isolement_recent;
        }
        if (isFirstView && (! $scope.locals.isInCouple) && (! captureIsolement())) {
            $scope.$emit('individu.pasDeConjoint');
        }
    }
    $scope.isInCoupleUpdated = isInCoupleUpdated;

    function rsaIsolementRecentUpdated() {
        if (! shouldDisplaySubmit()) {
            $scope.submit();
        }
    }
    $scope.rsaIsolementRecentUpdated = rsaIsolementRecentUpdated;

    function submit() {
        $state.go('foyer.logement');
    }
    $scope.submit = submit;

});
