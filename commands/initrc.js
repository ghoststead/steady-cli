const fs = require('fs');
const rimraf = require('rimraf');

const DEFAULT = {
    siteUrl: '<YOUR GHOST SITE URL>',
    adminApiKey: '<GHOST ADMIN API KEY>',
    themeName: 'ghoststead'
};

module.exports = {
    command: 'initrc',
    describe: 'Initialize a new rc file',
    builder: {},

    handler: function () {
        const content = JSON.stringify(DEFAULT, null, 4);
        if (fs.existsSync('.steadyrc')) {
            console.error('ERROR: .steadyrc already exists.');
            process.exit(1);
        } else {
            rimraf.sync('.steadyrc');
            fs.writeFileSync('.steadyrc', content + '\n', {flag: 'a+'});
        }
    }
};