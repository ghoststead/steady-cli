const axios = require('axios');
const fs = require('fs');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

const requireEnv = require('../utils/require-env.js');

module.exports = {
    command: 'publish-theme <path>',
    describe: 'Publish the theme to your Ghost site',

    builder: function (yargs) {
        yargs
            .positional('path', {
                describe: 'Path of the zip file containing the theme',
                type: 'string'
            });
    },

    handler: function (argv) {
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

        return axios.post(url,
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
};
