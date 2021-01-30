/*eslint-env mocha */
const cosmiconfig = require('cosmiconfig');
const axios = require('axios');
const yargs = require('yargs');

jest.mock('axios');

jest.spyOn(cosmiconfig, 'cosmiconfigSync').mockImplementation().mockReturnValue({
    search: () => ({
        config: {siteUrl: 'http://localhost:2368', adminApiKey: 'abc:xyz'}
    })
});

jest.spyOn(yargs, 'positional').mockImplementation();
jest.spyOn(console, 'log').mockImplementation();
jest.spyOn(console, 'error').mockImplementation();

describe('publish theme', () => {
    it('should publish theme', async () => {
        expect.assertions(3);
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
        await publishTheme.handler({path: process.cwd(), verbose: false});
        expect(axios.post).toHaveBeenCalledTimes(1);
        axios.post.mockClear();
    });

    it('should publish theme verbose', async () => {
        expect.assertions(1);
        const publishTheme = require('commands/publish-theme');
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
        expect(axios.post).toHaveBeenCalledTimes(1);
        axios.post.mockClear();
    });

    it('should call builder', async () => {
        expect.assertions(1);
        const publishTheme = require('commands/publish-theme');
        expect(publishTheme.builder(yargs)).toBeUndefined();
    });

    it('should fail with api error', async () => {
        expect.assertions(1);
        const errorMessage = 'Network Error';
        axios.post.mockImplementationOnce(
            () => Promise.reject(new Error(errorMessage))
        );

        const publishTheme = require('commands/publish-theme');
        await publishTheme.handler({path: process.cwd(), verbose: false});
        expect(axios.post).toHaveBeenCalledTimes(1);
        axios.post.mockClear();
    });
});
