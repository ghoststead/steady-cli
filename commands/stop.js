const execa = require('execa');
const workdir = require('../utils/workdir');

module.exports = {
    command: 'stop',
    describe: 'Stop the local Ghost instance',
    builder: {},

    handler: function (args) {
        workdir.use(args);
        execa.sync('ghost', ['stop'], {
            stdio: 'inherit'
        });
    }
};
