jest.mock('execa');

describe('stop', () => {
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
        process.chdir(__dirname);
    });

    it('should stop', () => {
        expect.assertions(4);
        const stop = require('commands/stop');
        expect(stop.command).toBe('stop');
        expect(stop.describe).toBeTruthy();
        expect(stop.builder).toStrictEqual({});
        expect(stop.handler({})).toBeUndefined();
    });

    it('should stop with workdir from argv', () => {
        expect.assertions(1);
        const stop = require('commands/stop');
        expect(stop.handler({workdir: '.'})).toBeUndefined();
    });

    it('should stop with workdir from rc', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const stop = require('commands/stop');
        expect(stop.handler({})).toBeUndefined();
    });
});
