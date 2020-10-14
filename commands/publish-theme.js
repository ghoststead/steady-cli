const axios = require('axios');
const fs = require('fs');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

const rc = require('../utils/rc.js');

module.exports = {
    command: 'publish-theme <path>',
    describe: 'Publish a Ghost theme using a given path',

    builder: function (yargs) {
        yargs
            .positional('path', {
                describe: 'Path of the zip file containing the theme',
                type: 'string'
            });
    },

    handler: function (args) {
        const path = args.path;

        const siteUrl = rc.require('siteUrl');
        const adminApiKey = rc.require('adminApiKey');
        const version = rc.config.version || 'v3';

        let formData = new FormData();
        formData.append('file', fs.createReadStream(path));

        const url = `${siteUrl}/ghost/api/${version}/admin/themes/upload/`;

        if (args.verbose) {
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
                if (args.verbose) {
                    console.log('done.');
                }
            })
            .catch(function (error) {
                console.error(error.toString());
            });
    }
};
