const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

test('initenv', () => {
    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);

    expect(initenv.handler()).toBeUndefined();
    expect(fs.existsSync(tmpDir + path.sep + '.env'));
    rimraf.sync(tmpDir);
});

test('initenv .env exists', () => {
    console.error = jest.fn();
    process.exit = jest.fn();

    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);
    fs.writeFileSync(tmpDir + path.sep + '.env', '');
    expect(initenv.handler()).toBeUndefined();
    rimraf.sync(tmpDir);

    expect(process.exit).toHaveBeenCalledWith(1);
});

