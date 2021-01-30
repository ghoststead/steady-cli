jest.mock('execa');

describe('develop', () => {
    it('should run', () => {
        expect.assertions(4);
        const develop = require('commands/develop');
        expect(develop.command).toBe('develop');
        expect(develop.describe).toBeTruthy();
        expect(develop.builder).toStrictEqual({});
        expect(develop.handler({})).toBeUndefined();
    });

    it('should run with workdir from args', () => {
        expect.assertions(1);
        const develop = require('commands/develop');
        expect(develop.handler({workdir: '.'})).toBeUndefined();
        process.chdir(__dirname);
    });

    it('should run with workdir from rc', () => {
        expect.assertions(1);
        const rc = require('utils/rc');
        rc.config = {workDir: '.'};

        const develop = require('commands/develop');
        expect(develop.handler({})).toBeUndefined();
        process.chdir(__dirname);
    });
});
