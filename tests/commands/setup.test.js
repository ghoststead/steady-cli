jest.mock('execa');

test('setup', () => {
    const setup = require('commands/setup');
    expect(setup.command).toBe('setup');
    expect(setup.describe).toBeTruthy();
    expect(setup.builder).toStrictEqual({});
    expect(setup.handler()).toMatchObject({});
});
