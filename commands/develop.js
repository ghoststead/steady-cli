'use strict';

const path = require('path');

const execa = require('execa');

module.exports = {
    command: 'develop',
    describe: 'Start the theme development process',
    builder: {},

    handler: function () {
        execa.sync('npm', ['run', 'dev'], {
            cwd: path.resolve('content', 'themes', 'ghoststead'),
            stdio: 'inherit'
        });
    }
};