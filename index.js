#!/usr/bin/env node
const fs = require('fs');
const axios = require('axios');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

require('dotenv').config();

function requireEnv(name) {
    let value = process.env[name];
    if (!value) {
        console.error('Missing environment variable: ' + name);
        process.exit(1);
    }
    return value;
}

function publishTheme(argv) {
    const path = argv.path;

    const siteUrl = requireEnv('SITE_URL');
    const adminApiKey = requireEnv('ADMIN_API_KEY');
    const version = process.env.API_VERSION || 'v3';

    let formData = new FormData();
    formData.append('file', fs.createReadStream(path));

    const url = `${siteUrl}/ghost/api/${version}/admin/themes/upload/`
    if (argv.verbose) {
        console.log(`Uploading ${path} to ${url}`);
    }

    axios.post(url,
        formData,
        {
            headers: {
                Authorization: `Ghost ${token(version, adminApiKey)}`,
                ...formData.getHeaders()
            }
        }
    )
        .then(function () {
            if (argv.verbose) {
                console.log('done.');
            }
        })
        .catch(function (error) {
            console.error(error.toString());
        });
}

require('yargs')
    .command('publish-theme <path>', 'Publish the theme to your Ghost site', (yargs) => {
        yargs
            .positional('path', {
                describe: 'Path of the zip file containing the theme',
                type: 'string'
            });
    }, publishTheme)
    .option('verbose', {
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .help()
    .showHelpOnFail(true)
    .demandCommand(1, '')
    .argv;
