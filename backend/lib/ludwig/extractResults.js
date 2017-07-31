var _ = require('lodash');

var requestedVariables = require('../openfisca/mapping/common').requestedVariables;

module.exports = function extractResults(openfiscaResponse) {
    var period = openfiscaResponse.params.scenarios[0].period.split(':')[1];
    var openfiscaResults = openfiscaResponse.value[0];
    return _.reduce(requestedVariables, function(result, aide, aideId) {
        if (aide.type == 'string') {
            return result;
        }

        var aideEntity = openfiscaResults[(aide.entity || 'famille') + 's'][0];
        result[aideId] = (aideEntity[aideId + '_non_calculable'] && aideEntity[aideId + '_non_calculable'][period]) ||
            (aideEntity[aideId] && aideEntity[aideId][period]);
        return result;
    }, {});
};
