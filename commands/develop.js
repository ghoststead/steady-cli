'use strict';

const path = require('path');
const execa = require('execa');

const rc = require('../utils/rc.js');

module.exports = {
    command: 'develop',
    describe: 'Start the theme development process',
    builder: {},

    handler: function () {
        let themeName = rc.config.themeName || 'ghoststead';
        execa.sync('npm', ['run', 'dev'], {
            cwd: path.resolve('content', 'themes', themeName),
            stdio: 'inherit'
        });
    }
};