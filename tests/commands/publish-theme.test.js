const cosmiconfig = require('cosmiconfig');
const axios = require('axios');

jest.mock('axios');

afterEach(() => {
    jest.clearAllMocks();
});

test('publish theme', async () => {
    const sync = {
        search: () => ({
            config: {siteUrl: 'http://localhost:2368', adminApiKey: 'abc:xyz'}
        })
    };
    jest.spyOn(cosmiconfig, 'cosmiconfigSync').mockImplementation(() => sync);
    console.log = jest.fn();

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
    await publishTheme.handler({path: process.cwd(), verbose: true});
});

test('publish theme api error', async () => {
    const errorMessage = 'Network Error';
    axios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    const sync = {
        search: () => ({
            config: {siteUrl: 'http://localhost:2368', adminApiKey: 'abc:xyz'}
        })
    };
    jest.spyOn(cosmiconfig, 'cosmiconfigSync').mockImplementation(() => sync);
    console.error = jest.fn();
    console.log = jest.fn();

    const publishTheme = require('commands/publish-theme');

    await publishTheme.handler({path: process.cwd(), verbose: false});
});
