const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

test('.env not', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});
    expect(initenv.handler()).toBeUndefined();
    expect(mockExit).toHaveBeenCalledWith(1);
    console.error = originalError;
});

test('.env exists', () => {
    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});
    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);
    if (fs.existsSync(tmpDir + path.sep + '.env')) {
        rimraf.sync(tmpDir + path.sep + '.env');
    }
    fs.rename('.env',tmpDir + path.sep + '.env',() => {});
    rimraf.sync('.env');
    expect(initenv.handler()).toBeUndefined();
    fs.rename(tmpDir + path.sep + '.env','.env',() => {});
    expect(fs.existsSync('.env')).toBeTruthy();
    rimraf.sync(tmpDir);
});

