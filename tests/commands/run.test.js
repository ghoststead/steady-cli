jest.mock('execa');

test('run', () => {
    const run = require('commands/run');
    expect(run.command).toBe('run');
    expect(run.describe).toBeTruthy();
    expect(run.builder).toStrictEqual({});
    expect(run.handler()).toBeUndefined();
});
