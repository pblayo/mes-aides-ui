angular.module('MAResources').controller('MAResourcesController', function($scope, MASituation) {
    $scope.data = [
        { date: new Date('2014-07'), salaires: 1440, af: 96},
        { date: new Date('2014-08'), salaires: 1440, af: 96},
        { date: new Date('2014-09'), salaires: 1440, af: 96},
        { date: new Date('2014-10'), salaires: 1440, af: 96},
        { date: new Date('2014-11'), salaires: 1440, af: 96},
        { date: new Date('2014-12'), salaires: 1440, af: 96},
        { date: new Date('2015-01'), salaires: 1440, af: 96},
        { date: new Date('2015-02'), salaires: 1440, af: 96},
        { date: new Date('2015-03'), salaires: 1340, af: 120},
        { date: new Date('2015-04'), salaires: 1340, af: 120},
        { date: new Date('2015-05'), salaires: 1340, af: 120},
        { date: new Date('2015-06'), salaires: 1340, af: 120},
        { date: new Date('2015-07'), salaires: 0, af: 120}
    ];

    $scope.options = {
        axes: {
            x: { key: 'date', type: 'date', ticksFormatter: function(date) { return moment(date).format('MMM YYYY') } },
            y: { type: 'linear', min: 0, max: 2000, ticks: 8 }
        },
        series: [
            { id: 'salaires', y: 'salaires', label: 'Salaires', color: 'steelblue', type: 'area' },
            { id: 'af', y: 'af', label: 'Allocations Familiales', color: 'lightsteelblue', type: 'area' }
        ],
        stacks: [
            {
              axis: 'y',
              series: [
                  'salaires',
                  'af'
              ]
            }
        ],
        lineMode: 'linear',
        tension: 0.7,
        tooltip: {mode: 'scrubber', formatter: function(x, y, series) {return 'pouet';}},
        drawLegend: true,
        drawDots: true,
        hideOverflow: false,
        columnsHGap: 5
    };
});
