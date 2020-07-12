const execa = require('execa');

module.exports = {
    command: 'stop',
    describe: 'Stop the local Ghost instance',
    builder: {},

    handler: function () {
        execa.sync('ghost', ['stop'], {
            stdio: 'inherit'
        });
    }
};
