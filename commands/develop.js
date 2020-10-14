const path = require('path');
const execa = require('execa');

const rc = require('../utils/rc.js');

module.exports = {
    command: 'develop',
    describe: 'Start the theme development process',
    builder: {},

    handler: function (args) {
        let themeName = rc.config.themeName || 'ghoststead';

        if (args.workdir) {
            process.chdir(args.workdir);
        } else if (rc.config.workDir) {
            process.chdir(rc.config.workDir);
        }

        execa.sync('npm', ['run', 'dev'], {
            cwd: path.resolve('content', 'themes', themeName),
            stdio: 'inherit'
        });
    }
};