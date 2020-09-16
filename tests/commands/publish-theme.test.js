const cosmiconfig = require('cosmiconfig');
const axios = require('axios');
jest.mock('axios');

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
    const theme = {
        themes: [{
            name: 'Test',
            package: {
                name: 'Test'
            },
            active: false
        }]
    };
    const resp = {data: theme};
    axios.post.mockResolvedValue(resp);
});
