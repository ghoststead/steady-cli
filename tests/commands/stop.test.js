
jest.mock('execa');

test('stop', () => {
    const stop = require('commands/stop');
    expect(stop.command).toBe('stop');
    expect(stop.describe).toBeTruthy();
    expect(stop.builder).toStrictEqual({});
    expect(stop.handler()).toBeUndefined();
});
