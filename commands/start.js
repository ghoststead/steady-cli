const execa = require('execa');
const rc = require('../utils/rc.js');

module.exports = {
    command: 'start',
    describe: 'Start the local Ghost instance',
    builder: {},

    handler: function (args) {
        if (args.workdir) {
            process.chdir(args.workdir);
        } else if (rc.config.workDir) {
            process.chdir(rc.config.workDir);
        }

        execa.sync('ghost', ['start', '--development'], {
            stdio: 'inherit'
        });
    }
};