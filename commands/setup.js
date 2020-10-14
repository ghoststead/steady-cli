const fs = require('fs');
const path = require('path');

const download = require('download');
const decompress = require('decompress');
const execa = require('execa');

const initrc = require('../commands/initrc');
const dirIsEmpty = require('../utils/dir-is-empty');
const walk = require('../utils/walk');

const GHOST_VERSION = '3.25.0-1';
const GHOST_ZIPFILE = 'Ghost-' + GHOST_VERSION + '.zip';
const GHOST_URL = 'https://github.com/ghoststead/Ghost/releases/download/v' + GHOST_VERSION + '/' + GHOST_ZIPFILE;
const GHOST_DB_URL = 'https://github.com/ghoststead/Ghost/releases/download/v' + GHOST_VERSION + '/ghost.db';

const THEME_URL = 'https://github.com/ghoststead/ghost-theme-ghoststead/archive/master.zip';
const ROUTES_YAML_URL = 'https://github.com/ghoststead/Ghost/releases/download/v' + GHOST_VERSION + '/routes.yaml';

module.exports = {
    command: 'setup',
    describe: 'Setup a development environment in the current directory',
    builder: {},

    handler: async function (args) {
        if (args.workdir) {
            process.chdir(args.workdir);
        }

        if (!dirIsEmpty(process.cwd())) {
            return Promise.reject(new Error('Current directory is not empty, setup cannot continue.'));
        }

        await download(GHOST_URL, '.dist');

        console.log('Installing base Ghost image ...');
        execa.sync('ghost', ['install',
            '--zip', '.dist/' + GHOST_ZIPFILE, '--db=sqlite3',
            '--no-prompt', '--no-stack', '--no-setup',
            '--dir', process.cwd()
        ], {stdio: 'inherit'});

        console.log('Initial Ghost configuration ...');
        execa.sync('ghost', ['config',
            '--ip', '0.0.0.0', '--port', '2368', '--no-prompt',
            '--db=sqlite3', '--url', 'http://localhost:2368',
            '--process', 'local',
            '--dbpath', path.resolve('content', 'data', 'ghost.db')
        ], {stdio: 'inherit'});

        console.log('Configuring Ghost content path ...');
        execa.sync('ghost', ['config',
            'paths.contentPath', path.resolve('content')
        ], {stdio: 'inherit'});

        console.log('Creating config.development.json ...');
        fs.renameSync(
            'config.production.json',
            'config.development.json'
        );

        console.log('Installing sqlite3 in local Ghost ...');
        execa.sync('yarn', ['add', 'sqlite3'], {
            cwd: path.resolve('current'),
            stdio: 'inherit'
        });

        console.log('Fixing file permissions on Ghost installation ...');
        for await (const path of walk('current')) {
            fs.chmodSync(path, 0o644);
        }

        console.log('Downloading GhostStead theme ...');
        await download(THEME_URL, '.dist', {
            filename: 'theme.zip'
        });

        console.log('Decompressing theme ...');
        await decompress(
            path.resolve('.dist', 'theme.zip'),
            path.resolve('content', 'themes')
        );
        fs.renameSync(
            path.resolve('content', 'themes', 'ghost-theme-ghoststead-master'),
            path.resolve('content', 'themes', 'ghoststead')
        );

        console.log('Installing theme dependencies ...');
        execa.sync('npm', ['install'], {
            cwd: path.resolve('content', 'themes', 'ghoststead'),
            stdio: 'inherit'
        });

        console.log('Building GhostStead theme ...');
        execa.sync('npm', ['run', 'build'], {
            cwd: path.resolve('content', 'themes', 'ghoststead'),
            stdio: 'inherit'
        });

        console.log('Downloading ' + GHOST_DB_URL + ' ...');
        await download(GHOST_DB_URL, path.resolve('content/data'));

        console.log('Downloading ' + ROUTES_YAML_URL + ' ...');
        await download(ROUTES_YAML_URL, path.resolve('content', 'settings'));

        fs.writeFileSync('.nvmrc', process.version);
        initrc.handler(args);

        console.log('SUCCESS!');
    }
};
