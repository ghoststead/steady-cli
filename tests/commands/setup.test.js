const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

jest.mock('execa');
jest.mock('decompress');

test('setup', async () => {
    console.log = jest.fn;
    fs.renameSync = jest.fn;

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);

    jest.mock('download', () => {
        return jest.fn(() => {
            const fs = require('fs');
            const path = require('path');

            const currentDir = process.cwd() + path.sep + 'current' + path.sep;
            if (!fs.existsSync(currentDir)) {
                fs.mkdirSync(currentDir);
            }
        });
    });

    const setup = require('commands/setup');
    expect(setup.command).toBe('setup');
    expect(setup.describe).toBeTruthy();
    expect(setup.builder).toStrictEqual({});

    await setup.handler();
    await rimraf.sync(tmpDir);
});

test('setup2', () => {
    console.log('XXX');
});