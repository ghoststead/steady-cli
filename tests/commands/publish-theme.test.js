/*eslint-env mocha */
const cosmiconfig = require('cosmiconfig');
const axios = require('axios');

jest.mock('axios');

cosmiconfig.cosmiconfigSync = jest.fn().mockReturnValue({
    search: () => ({
        config: {siteUrl: 'http://localhost:2368', adminApiKey: 'abc:xyz'}
    })
});

console.log = jest.fn();
console.error = jest.fn();

test('publish theme', async () => {
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
    axios.post.mockResolvedValueOnce(resp);
    await publishTheme.handler({path: process.cwd(), verbose: true});
});

test('publish theme api error', async () => {
    const errorMessage = 'Network Error';
    axios.post.mockImplementationOnce(
        () => Promise.reject(new Error(errorMessage))
    );

    const publishTheme = require('commands/publish-theme');
    await publishTheme.handler({path: process.cwd(), verbose: false});
});
