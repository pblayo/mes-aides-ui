angular.module('MAResources')
.controller('MAResourcesController', function($scope, MASituation, MAResourcesList, MAResourcesCategoriesList) {
    $scope.individu = MASituation.individus[0];

    $scope.options = {
        drawLegend: false,
        drawDots: true,
        axes: {
            x: {
                key: 'date',
                type: 'date',
                ticksFormatter: function formatDate(date) {
                    var format = 'MMMM';

                    if (date.getMonth() == 0 || date.getMonth() == new Date().getMonth())
                        format = 'YYYY';

                    return moment(date).format(format);
                }
            },
            y: {
                min: 0,
                ticks: 4,
                ticksFormatter: function formatCurrency(amount) {
                    return amount + ' €';
                }
            }
        },
        tooltip: {
            formatter: function makeTooltip(date, amount, series) {
                var label = series.label.toLowerCase(),
                    result = 'En '
                             + moment(date).format('MMMM YYYY')
                             + ', vous ';

                if (amount) {
                    result += 'avez perçu '
                            + amount
                            + ' € en '
                            + label;
                } else {
                    result += 'n’avez pas perçu de '
                            + label;
                }

                result += '.';

                return result;
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
