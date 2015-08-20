angular.module('MAResources')
.controller('MAResourcesController', function($scope, MASituation, MAResourcesList, MAResourcesCategoriesList, MAResource) {
    $scope.oneYearAgo = moment().subtract('years', 1);

    $scope.type = {};

    $scope.createResource = function createResource(type) {
        return new MAResource.Resource(type.id);
    }

    $scope.individu = MASituation.individus[0];

    var today = new Date();

    $scope.options = {
        drawLegend: false,
        axes: {
            x: {
                key: 'date',
                type: 'date',
                ticksFormatter: function formatDate(date) {
                    var format = 'MMM';

                    if (date.getMonth() == 0  // replace January by year
                        || (date.getMonth() == today.getMonth() && date.getFullYear() != today.getFullYear()))  // replace first column label by year
                        format = 'YYYY';

                    return moment(date).format(format);
                }
            },
            y: {
                min: 0,
                ticks: 0,
            }
        },
        tooltip: {
            formatter: function makeTooltip(date, amount, series) {
                return amount + ' €';
            }
        }
    };

    $scope.options.series = [];
    $scope.options.stacks = [ { axis: 'y', series: [] } ];

    $scope.$watch(function() {
        return $scope.individu.resources;
    }, function() {
        var data = {};
        $scope.options.stacks[0].series = [];
        $scope.options.series = [];

        $scope.individu.resources.forEach(function(resource, index) {
            var resourceType = MAResourcesList[resource.type];

            if (! resourceType)
                return;  // the user is still constructing the resource

            var entryId = 'resource:' + index;

            $scope.options.series.push({
                id: entryId,
                y: entryId,
                label: resourceType.label,
                color: MAResourcesCategoriesList[resourceType.category].color,
                thickness: '0px',
                type: 'column'
            });

            $scope.options.stacks[0].series.push(entryId);

            angular.forEach(resource.earnedOn, function(didEarn, date) {
                data[date] = data[date] || { date: new Date(date) };
                data[date][entryId] =  data[date][entryId] || 0;
                data[date][entryId] += didEarn && resource.value;
            });
        });

        $scope.chartableResources = [];
        angular.forEach(data, function(point) {
            $scope.chartableResources.push(point);  // assumes that objects keeps insertion order
        });
    }, true);
});
