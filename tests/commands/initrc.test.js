const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

test('.steadyrc not exists', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    const initrc = require('commands/initrc');
    expect(initrc.command).toBe('initrc');
    expect(initrc.describe).toBeTruthy();
    expect(initrc.builder).toStrictEqual({});
    expect(initrc.handler()).toBeUndefined();
    expect(mockExit).toHaveBeenCalledWith(1);
    console.error = originalError;
});

test('.steadyrc already exists', () => {
    const initrc = require('commands/initrc');
    expect(initrc.command).toBe('initrc');
    expect(initrc.describe).toBeTruthy();
    expect(initrc.builder).toStrictEqual({});
    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);
    if (fs.existsSync(tmpDir + path.sep + '.steadyrc')) {
        rimraf.sync(tmpDir + path.sep + '.steadyrc');
    }
    fs.rename('.steadyrc',tmpDir + path.sep + '.steadyrc',() => {});
    rimraf.sync('.steadyrc');
    expect(initrc.handler()).toBeUndefined();
    fs.rename(tmpDir + path.sep + '.steadyrc','.steadyrc',() => {});
    expect(fs.existsSync('.steadyrc')).toBeTruthy();
    rimraf.sync(tmpDir);
});
