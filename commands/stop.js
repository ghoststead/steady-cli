const execa = require('execa');
const rc = require('../utils/rc.js');

module.exports = {
    command: 'stop',
    describe: 'Stop the local Ghost instance',
    builder: {},

    handler: function (args) {
        if (args.workdir) {
            process.chdir(args.workdir);
        } else if (rc.config.workDir) {
            process.chdir(rc.config.workDir);
        }

        execa.sync('ghost', ['stop'], {
            stdio: 'inherit'
        });
    }
};
