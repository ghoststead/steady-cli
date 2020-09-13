const cosmiconfig = require('cosmiconfig');
const fs = require('fs');
const axios = require('axios');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

test('publish theme', async () => {
    const sync = {
        search: () => ({
            config: {siteUrl: 'http://localhost:2368', adminApiKey: 'abc:xyz'}
        })
    };
    jest.spyOn(cosmiconfig, 'cosmiconfigSync').mockImplementation(() => sync);
    
    const publishTheme = require('commands/publish-theme');
    expect(publishTheme.command).toContain('publish-theme');
    expect(publishTheme.describe).toBeTruthy();

    const argv = {path: process.cwd()};
    const path = argv.path;
    const rc = require('../../utils/rc.js');
    const siteUrl = rc.require('siteUrl');
    const adminApiKey = rc.require('adminApiKey');
    const version = process.env.API_VERSION || 'v3';
    
    let formData = new FormData();
    formData.append('file', fs.createReadStream(path));

    const url = `${siteUrl}/ghost/api/${version}/admin/themes/upload/`;
    if (argv.verbose) {
        console.log(`Uploading ${path} to ${url}`);
    }

    await axios.post(url,
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
});
