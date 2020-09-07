jest.mock('execa');

test('develop', () => {
    const develop = require('commands/develop');
    expect(develop.command).toBe('develop');
    expect(develop.describe).toBeTruthy();
    expect(develop.builder).toStrictEqual({});
    expect(develop.handler()).toBe(undefined);
});
