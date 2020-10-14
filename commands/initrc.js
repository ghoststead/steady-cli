const fs = require('fs');

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
            process.chdir(args.workdir);
        }

        const content = JSON.stringify(DEFAULT, null, 4);
        if (fs.existsSync('.steadyrc')) {
            console.error('ERROR: .steadyrc already exists.');
            return process.exit(1);
        }

        fs.writeFileSync('.steadyrc', content + '\n');
    }
};