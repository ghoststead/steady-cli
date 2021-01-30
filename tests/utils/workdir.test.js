const os = require('os');
const path = require('path');
const fs = require('fs');

const rimraf = require('rimraf');

const workdir = require('../../utils/workdir');

describe('workdir', () => {
    it('should use', () => {
        expect.assertions(2);
        const tmpDir = fs.mkdtempSync(fs.realpathSync(os.tmpdir()) + path.sep);

        expect(workdir.use({
            workdir: tmpDir
        })).toBeUndefined();

        const cwd = fs.realpathSync(process.cwd());
        expect(cwd).toStrictEqual(tmpDir);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });

    it('should fail with directory not found', () => {
        expect.assertions(2);

        const tmpDir = path.join(os.tmpdir(), 'XXX');
        expect(fs.existsSync(tmpDir)).toBeFalsy();

        expect(() => {
            workdir.use({
                workdir: tmpDir
            });
        }).toThrow(`The specified workdir does not exist: ${tmpDir}`);
    });

    it('should fail with not directory', () => {
        expect.assertions(1);

        const tmpDir = fs.mkdtempSync(fs.realpathSync(os.tmpdir()) + path.sep);
        const tmpFilePath = path.join(tmpDir, 'XXX');
        fs.closeSync(fs.openSync(tmpFilePath, 'w'));

        expect(() => {
            workdir.use({
                workdir: tmpFilePath
            });
        }).toThrow(`The specified workdir exists but is not a directory: ${tmpDir}`);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
});
