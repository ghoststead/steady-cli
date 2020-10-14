jest.mock('execa');

test('stop', () => {
    const stop = require('commands/stop');
    expect(stop.command).toBe('stop');
    expect(stop.describe).toBeTruthy();
    expect(stop.builder).toStrictEqual({});
    expect(stop.handler({})).toBeUndefined();
});

test('stop argv workdir', () => {
    const stop = require('commands/stop');
    expect(stop.handler({workdir: '.'})).toBeUndefined();
});

test('stop rc workDir', () => {
    const rc = require('utils/rc');
    rc.config = {workDir: '.'};

    const stop = require('commands/stop');
    expect(stop.handler({})).toBeUndefined();
});