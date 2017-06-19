module.exports = {
    acceptedTestsLocation: 'tests/ludwig',
    cors: 'CORS Allow-Origin - list all domains that will use this instance',
    github: {
        accessToken: process.env.LUDWIG_ACCESS_TOKEN,
        branch: 'ludwig',
        clientID: 'b5a749648fca58d886ec',
        clientSecret: process.env.LUDWIG_GH_CLIENT_SECRET
    },
    ip: 'localhost',
    mongo: {
        uri: 'mongodb://localhost/ludwig',
        options: {}
    },
    port: process.env.PORT || 9000,
    repo: 'guillett/openfisca-france',
    root: '/ludwig',
    session: {
        secret: 'Application session secret? (arbitrary, used for session authentication)',
    },
    testFileExtension: 'yaml',
};
