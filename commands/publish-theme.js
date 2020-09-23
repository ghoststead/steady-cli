const axios = require('axios');
const fs = require('fs');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

const rc = require('../utils/rc.js');

module.exports = {
    command: 'publish-theme <path>',
    describe: 'Publish the theme to your Ghost site',

    builder: function (yargs) {
        /* istanbul ignore next */
        yargs
            .positional('path', {
                describe: 'Path of the zip file containing the theme',
                type: 'string'
            });
    },

    handler: function (argv) {
        const path = argv.path;

        const siteUrl = rc.require('siteUrl');
        const adminApiKey = rc.require('adminApiKey');
        const version = process.env.API_VERSION || 'v3';

        let formData = new FormData();
        formData.append('file', fs.createReadStream(path));

        const url = `${siteUrl}/ghost/api/${version}/admin/themes/upload/`;

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
                /* istanbul ignore next */
                if (argv.verbose) {
                    console.log('done.');
                }
            })
            .catch(function (error) {
                console.error(error.toString());
            });
    }
};
