const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

describe('dir-is-empty', () => {
    it('should not be empty', () => {
        expect.assertions(1);
        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        const dirIsEmpty = require('utils/dir-is-empty.js');
        expect(!dirIsEmpty(os.tmpdir())).toBeTruthy();
        rimraf.sync(tmpDir);
    });

    it('should be empty', () => {
        expect.assertions(1);
        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        const dirIsEmpty = require('utils/dir-is-empty.js');
        expect(dirIsEmpty(tmpDir)).toBeTruthy();
        rimraf.sync(tmpDir);
    });
});