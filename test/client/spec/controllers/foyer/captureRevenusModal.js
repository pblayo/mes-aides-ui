'use strict';

describe('Controller: FoyerCaptureRevenusModalCtrl', function() {

    var scope;

    beforeEach(function() {
        module('ddsApp');
        scope = {};
    });

    describe('initialization', function() {
        it('should create an array of individu references containing their label and an empty selected ressources map', function() {
            // given
            var individus = [{}, {}];

            // when
            inject(function($controller) {
                $controller('FoyerCaptureRevenusModalCtrl', {$scope: scope, $modalInstance: {}, individus: individus});
            });

            // then
            expect(scope.individuRefs[0].selectedRessources).toBeDefined();
            expect(scope.individuRefs[1].selectedRessources).toBeDefined();
        });
    });

    describe('function submit()', function() {
        it('should broadcast the "ressourcesCaptured" event when closing the modal', function() {
            // given
            var rootScope;
            inject(function($controller, $rootScope) {
                $controller('FoyerCaptureRevenusModalCtrl', {$scope: scope, $modalInstance: {close: function() {}}, individus: []});
                rootScope = $rootScope;
            });
            spyOn(rootScope, '$broadcast').andCallThrough();
            scope.ressourcesSelected = true;

            // when
            scope.submit();

            // then
            expect(rootScope.$broadcast).toHaveBeenCalledWith('ressourcesCaptured');
        });
    });

    describe('function hasRessources()', function() {
        it('should return false if no individu has selected ressources', function() {
            // given
            var individus = [{}];
            inject(function($controller) {
                $controller('FoyerCaptureRevenusModalCtrl', {$scope: scope, $modalInstance: {close: function() {}}, individus: individus});
            });
            scope.individuRefs[0].selectedRessources.test = false;

            // when
            var result = scope.hasRessources();

            // then
            expect(result).toBe(false);
        });

        it('should return true if an individu has selected ressources', function() {
            // given
            var individus = [{}, {}];
            inject(function($controller) {
                $controller('FoyerCaptureRevenusModalCtrl', {$scope: scope, $modalInstance: {close: function() {}}, individus: individus});
            });
            scope.individuRefs[0].selectedRessources.test = true;
            scope.individuRefs[1].selectedRessources.test = false;

            // when
            var result = scope.hasRessources();

            // then
            expect(result).toBe(true);
        });
    });
});
