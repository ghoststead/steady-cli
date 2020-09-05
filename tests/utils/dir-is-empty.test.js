const fs = require('fs');
const osTmpdir = require('os-tmpdir');
const rimraf = require('rimraf');
const tempDir = '/dir_is_empty';
const createDir = (dirPath) => {
    fs.mkdirSync(osTmpdir() + dirPath, {recursive: true, mode: '0777'});
};
test('dir is not empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(!dirIsEmpty(osTmpdir())).toBeTruthy();
});
test('dir is empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    createDir(tempDir);
    expect(dirIsEmpty(osTmpdir() + tempDir)).toBeTruthy();
    rimraf(osTmpdir() + tempDir, () => {});
});
