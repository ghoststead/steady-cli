jest.mock('execa');

test('develop', () => {
    const develop = require('commands/develop');
    expect(develop.command).toBe('develop');
    expect(develop.describe).toBeTruthy();
    expect(develop.builder).toStrictEqual({});
    expect(develop.handler({})).toBeUndefined();
});

test('develop argv workdir', () => {
    const develop = require('commands/develop');
    expect(develop.handler({workdir: '.'})).toBeUndefined();
});

test('develop rc workDir', () => {
    const rc = require('utils/rc');
    rc.config = {workDir: '.'};

    const develop = require('commands/develop');
    expect(develop.handler({})).toBeUndefined();
});
