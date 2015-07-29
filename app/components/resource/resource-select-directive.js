angular.module('MAResources')
.directive('maResourceSelect', function(MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-select.html',
        scope: {
            individu: '=',
            fireSelect: '&onSelect'
        },
        link: function($scope) {
            $scope.matchingResources = function getMatchingResources(query) {
                var result = [],
                    query = new RegExp(query, 'i');

                angular.forEach(MAResourcesList, function(resource) {
                    if (resource.label.match(query))
                        result.push(resource);
                });

                return result;
            }

            $scope.handleSelect = function handleSelect(selectedResource) {
                $scope.individu.addResource(selectedResource.id);
                $scope.fireSelect({ resource: selectedResource });
                $scope.resource = null;  // empty selector
            }
        }
    }
});
