const axios = require('axios');
const fs = require('fs');
const token = require('@tryghost/admin-api/lib/token');
const FormData = require('form-data');

test('publish theme', async () => {
    const publishTheme = require('commands/publish-theme');
    expect(publishTheme.command).toContain('publish-theme');
    expect(publishTheme.describe).toBeTruthy();
    const argv = {path: process.cwd()};
    const path = argv.path;
    const siteUrl = 'http://127.0.0.1:2368/';
    const adminApiKey = 'abc:xyz';
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
        .then((response) => {
            console.log(response);
        }).catch ((error) => {
            console.log(error);
        });
});
