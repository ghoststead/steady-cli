const fs = require('fs');

const workdir = require('../utils/workdir');

const DEFAULT = {
    siteUrl: null,
    adminApiKey: null,
    themeName: 'ghoststead'
};

module.exports = {
    command: 'initrc',
    describe: 'Initialize a new rc file',
    builder: {},

    handler: function (args) {
        if (args.workdir) {
            workdir.check(args.workdir);
            process.chdir(args.workdir);
        }

        const content = JSON.stringify(DEFAULT, null, 4);
        if (fs.existsSync('.steadyrc')) {
            throw new Error(`.steadyrc already exists.`);
        }

        fs.writeFileSync('.steadyrc', `${content }\n`);
    }
};