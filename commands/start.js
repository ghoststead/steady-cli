const execa = require('execa');
const workdir = require('../utils/workdir');

module.exports = {
    command: 'start',
    describe: 'Start the local Ghost instance',
    builder: {},

    handler: function (args) {
        workdir.use(args);
        execa.sync('ghost', ['start', '--development'], {
            stdio: 'inherit'
        });
    }
};