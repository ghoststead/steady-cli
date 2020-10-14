jest.mock('execa');

test('run', () => {
    const run = require('commands/run');
    expect(run.command).toBe('run');
    expect(run.describe).toBeTruthy();
    expect(run.builder).toStrictEqual({});
    expect(run.handler({})).toBeUndefined();
});

test('run argv workdir', () => {
    const run = require('commands/run');
    expect(run.handler({workdir: '.'})).toBeUndefined();
});

test('run rc workDir', () => {
    const rc = require('utils/rc');
    rc.config = {workDir: '.'};

    const run = require('commands/run');
    expect(run.handler({})).toBeUndefined();
});
