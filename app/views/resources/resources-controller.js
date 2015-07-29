angular.module('MAResources')
.controller('MAResourcesController', function($scope, MASituation, MAResourcesList) {
    $scope.individu = MASituation.individus[0];

    $scope.options = {
        drawLegend: true,
        drawDots: true,
        axes: {
            x: {
                key: 'date',
                type: 'date',
                ticksFormatter: function formatDate(date) {
                    return moment(date).format('MMM YYYY');
                }
            },
            y: {
                ticksFormatter: function formatCurrency(amount) {
                    return amount + ' €';
                }
            }
        },
        tooltip: {
            formatter: function makeTooltip(date, amount, series) {
                return  'En '
                        + moment(date).format('MMMM YYYY')
                        + ', vous avez touché des '
                        + series.label.toLowerCase()
                        + ' de '
                        + amount
                        + ' €.';
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
            var entryId = 'resource:' + index;

            $scope.options.series.push({
                id: entryId,
                y: entryId,
                label: MAResourcesList[resource.type].label,
                color: 'hsl(' + (45 * resource.type.length) + ',100%,' + (60 - 15 * index ) + '%)',
                thickness: '0px',
                type: 'area'
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
