var openfisca = require('../lib/openfisca');
var openfiscaTest = require('../lib/openfisca/test');
var Situation = require('mongoose').model('Situation');

exports.situation = function(req, res, next, id) {
    Situation.findById(id, function(err, situation) {
        if (err) return next(err);
        if (! situation) return res.sendStatus(404);

        req.situation = situation;
        next();
    });
};

exports.show = function(req, res) {
    res.send(req.situation);
};

exports.create = function(req, res, next) {
    return Situation.create(req.body, function(err, persistedSimulation) {
        if (err) return next(err);

        res.send(persistedSimulation);
    });
};

exports.openfiscaResponse = function(req, res, next) {
    return openfisca.calculate(req.situation, function(err, result) {
        if (err) return next(Object.assign(err, { _id: req.situation._id }));

        res.send(Object.assign(result, { _id: req.situation._id }));
    });
};

exports.openfiscaRequest = function(req, res) {
    res.send(openfisca.buildOpenFiscaRequest(req.situation));
};

exports.openfiscaRequestFromLegacy = function(req, res) {
    res.send(openfisca.buildOpenFiscaRequestFromLegacySituation(req.situation));
};

exports.openfiscaTest = function(req, res) {
    var details = {
        name: 'default name',
        description: 'default description',
        output_variables: {
            valueOne: 1,
        },
        absolute_error_margin: 0.1,
    };
    var situation = req.situation.toObject ? req.situation.toObject() : req.situation;
    res.type('yaml').send(openfiscaTest.generateYAMLTest(details, situation));
};

