angular.module('MAResources')
.controller('MAResourcesController', function($scope, MASituation, MAResourcesList) {
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
        return MASituation.individus[0].resources;
    }, function() {
        var data = {};
        $scope.options.stacks[0].series = [];
        $scope.options.series = [];

        angular.forEach(MASituation.individus[0].resources, function(entries, id) {
            entries.forEach(function(entry, index) {
                var entryId = id + ':' + index;

                $scope.options.series.push({
                    id: entryId,
                    y: entryId,
                    label: MAResourcesList[id].label,
                    color: 'hsl(' + (45 * id.length) + ',100%,' + (60 - 15 * index ) + '%)',
                    thickness: '0px',
                    type: 'area'
                });

                $scope.options.stacks[0].series.push(entryId);

                angular.forEach(entry.earnedOn, function(earned, date) {
                    data[date] = data[date] || { date: new Date(date) };
                    data[date][entryId] =  data[date][entryId] || 0;
                    data[date][entryId] += earned && entry.value;
                });
            })
        });

        $scope.resources = [];
        angular.forEach(data, function(point) {
            $scope.resources.push(point);  // assumes that objects keeps insertion order
        });
    }, true);
});
