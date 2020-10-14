const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

test('dir is not empty', () => {
    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(!dirIsEmpty(os.tmpdir())).toBeTruthy();
    rimraf.sync(tmpDir);
});

test('dir is empty', () => {
    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(dirIsEmpty(tmpDir)).toBeTruthy();
    rimraf.sync(tmpDir);
});
