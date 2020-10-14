const execa = require('execa');
const rc = require('../utils/rc.js');

module.exports = {
    command: 'run',
    describe: 'Run the local Ghost instance in the foreground',
    builder: {},

    handler: function (args) {
        if (args.workdir) {
            process.chdir(args.workdir);
        } else if (rc.config.workDir) {
            process.chdir(rc.config.workDir);
        }

        execa.sync(process.execPath, ['current/index.js'], {stdio: 'inherit'});
    }
};
