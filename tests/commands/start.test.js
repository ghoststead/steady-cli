jest.mock('execa');

test('start', () => {
    const start = require('commands/start');
    expect(start.command).toBe('start');
    expect(start.describe).toBeTruthy();
    expect(start.builder).toStrictEqual({});
    expect(start.handler({})).toBeUndefined();
});

test('start argv workdir', () => {
    const start = require('commands/start');
    expect(start.handler({workdir: '.'})).toBeUndefined();
});

test('start rc workDir', () => {
    const rc = require('utils/rc');
    rc.config = {workDir: '.'};

    const start = require('commands/start');
    expect(start.handler({})).toBeUndefined();
});