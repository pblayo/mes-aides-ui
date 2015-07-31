angular.module('MAResources')
.directive('maResourceSelect', function(MAResourcesList) {
    return {
        restrict: 'E',
        templateUrl: '/components/resource/resource-select.html',
        scope: {
            resource: '=',
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

            $scope.resourcesList = MAResourcesList;
        }
    }
});
