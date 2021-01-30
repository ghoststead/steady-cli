jest.mock('execa');

describe('stop', () => {
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
        process.chdir(__dirname);
    });

    it('start', () => {
        expect.assertions(4);
        const start = require('commands/start');
        expect(start.command).toBe('start');
        expect(start.describe).toBeTruthy();
        expect(start.builder).toStrictEqual({});
        expect(start.handler({})).toBeUndefined();
    });

    it('start argv workdir', () => {
        expect.assertions(1);
        const start = require('commands/start');
        expect(start.handler({workdir: '.'})).toBeUndefined();
    });

    it('start rc workdir', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const start = require('commands/start');
        expect(start.handler({})).toBeUndefined();
    });
});
