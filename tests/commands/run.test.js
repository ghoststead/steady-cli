jest.mock('execa');

describe('run', () => {
    it('should run', () => {
        expect.assertions(4);
        const run = require('commands/run');
        expect(run.command).toBe('run');
        expect(run.describe).toBeTruthy();
        expect(run.builder).toStrictEqual({});
        expect(run.handler({})).toBeUndefined();
    });

    it('should run with workdir from argv', () => {
        expect.assertions(1);
        const run = require('commands/run');
        expect(run.handler({workdir: '.'})).toBeUndefined();
    });

    it('should run with workdir from rc', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const run = require('commands/run');
        expect(run.handler({})).toBeUndefined();
    });
});
