const execa = require('execa');

module.exports = {
    command: 'start',
    describe: 'Start the local Ghost instance',
    builder: {},

    handler: function () {
        execa.sync('ghost', ['start', '--development'], {
            stdio: 'inherit'
        });
    }
};