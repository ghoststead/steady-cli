jest.mock('execa');

test('setup', async () => {
    const setup = require('commands/setup');
    expect(setup.command).toBe('setup');
    expect(setup.describe).toBeTruthy();
    expect(setup.builder).toStrictEqual({});
    const dirIsEmpty = require('../../utils/dir-is-empty.js');
    if (dirIsEmpty(process.cwd())) {
        expect(await setup.handler()).toBeUndefined();
    }
});

test('setup directoy not empty', async () => {
    const dirIsEmpty = require('../../utils/dir-is-empty.js');
    expect(dirIsEmpty(process.cwd())).toBeFalsy();
});