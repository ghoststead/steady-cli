'use strict';

const execa = require('execa');

module.exports = {
    command: 'run',
    describe: 'Run the local Ghost instance in the foreground',
    builder: {},

    handler: function () {
        execa.sync(process.execPath, ['current/index.js'], {stdio: 'inherit'});
    }
};
