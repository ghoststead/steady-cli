jest.mock('execa');

test('setup', async () => {
    const setup = require('commands/setup');
    expect(setup.command).toBe('setup');
    expect(setup.describe).toBeTruthy();
    expect(setup.builder).toStrictEqual({});
    expect(await setup.handler()).toBeUndefined();
});

