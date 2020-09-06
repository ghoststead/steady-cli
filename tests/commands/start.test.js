jest.mock('execa');

test('start', () => {
    const start = require('commands/start');
    expect(start.command).toBe('start');
    expect(start.describe).toBeTruthy();
    expect(start.builder).toStrictEqual({});
    expect(start.handler()).toBe(undefined);
});
