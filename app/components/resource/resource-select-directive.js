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
                var exact = [],
                    synonyms = [],
                    query = new RegExp(query, 'i');

                angular.forEach(MAResourcesList, function(resource) {
                    if (resource.label.match(query)) {
                        exact.push(resource);
                    } else if (resource.synonyms && resource.synonyms.match(query)) {  // don't list a type twice
                        synonyms.push(resource);  // ensure shown below exact matches
                    }
                });

                return exact.concat(synonyms);
            }

            $scope.resourcesList = MAResourcesList;
        }
    }
});
