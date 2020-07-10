'use strict';

const fs = require('fs');
const path = require('path');

const download = require('download');
const execa = require('execa');

const dirIsEmpty = require('../utils/dir-is-empty');
const walk = require('../utils/walk');

module.exports = {
    command: 'setup',
    describe: 'Setup a development environment in the current directory',
    builder: {},

    handler: async function () {
        if (!dirIsEmpty(process.cwd())) {
            return Promise.reject(new Error('Current directory is not empty, setup cannot continue.'));
        }

        console.log('Download ghost from ghoststead.com...');
        const url = 'https://www.ghoststead.com/static/release/ghost.zip';
        await download(url, '.dist');

        console.log('Installing base Ghost image...');
        execa.sync('ghost', ['install',
            '--zip', '.dist/ghost.zip', '--db sqlite3',
            '--no-prompt', '--no-stack', '--no-setup',
            '--dir', process.cwd()
        ], {stdio: 'inherit'});

        console.log('Initial Ghost configuration...');
        execa.sync('ghost', ['config',
            '--ip', '0.0.0.0', '--port', '2368', '--no-prompt',
            '--db sqlite3', '--url', 'http://localhost:2368',
            '--process', 'local',
            '--dbpath', path.resolve('content', 'data', 'ghost.db')
        ], {stdio: 'inherit'});

        console.log('Configuring Ghost content path...');
        execa.sync('ghost', ['config',
            'paths.contentPath', path.resolve('content')
        ], {stdio: 'inherit'});

        console.log('Creating config.development.json...');
        fs.renameSync(
            'config.production.json',
            'config.development.json'
        );

        console.log('Installing sqlite3...');
        execa.sync('yarn', ['add', 'sqlite3'], {
            cwd: path.resolve('current'),
            stdio: 'inherit'
        });

        console.log('Fixing file permissions...');
        for await (const path of walk('current')) {
            fs.chmodSync(path, 0o644);
        }
    }
};
