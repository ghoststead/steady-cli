const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

test('initrc', () => {
    const initrc = require('commands/initrc');
    expect(initrc.command).toBe('initrc');
    expect(initrc.describe).toBeTruthy();
    expect(initrc.builder).toStrictEqual({});

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);
    expect(initrc.handler()).toBeUndefined();
    expect(fs.existsSync(tmpDir + path.sep + '.steadyrc'));
    rimraf.sync(tmpDir);
});

test('initrc .steadyrc already exists', () => {
    console.error = jest.fn();
    process.exit = jest.fn();

    const initrc = require('commands/initrc');
    expect(initrc.command).toBe('initrc');
    expect(initrc.describe).toBeTruthy();
    expect(initrc.builder).toStrictEqual({});

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);
    fs.writeFileSync(tmpDir + path.sep + '.steadyrc', '');

    expect(initrc.handler()).toBeUndefined();
    expect(process.exit).toHaveBeenCalledWith(1);
    rimraf.sync(tmpDir);
});
