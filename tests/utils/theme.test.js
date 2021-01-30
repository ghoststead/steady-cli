const os = require('os');
const path = require('path');
const fs = require('fs');

const rimraf = require('rimraf');

const theme = require('../../utils/theme');

describe('theme', () => {
    it('should fail with directory not found', () => {
        expect.assertions(1);

        const tmpDir = os.tmpdir();
        process.chdir(tmpDir);

        expect(() => {
            theme.check('ghoststead');
        }).toThrow('The configured theme does not exist: ghoststead');
    });

    it('should fail with not directory', () => {
        expect.assertions(1);

        const tmpDir = fs.mkdtempSync(fs.realpathSync(os.tmpdir()) + path.sep);
        process.chdir(tmpDir);

        const themeDir = theme.fullpath();
        fs.mkdirSync(themeDir, {recursive: true});

        expect(() => {
            theme.check();
        }).toThrow(`The theme exists but is not valid since it doesn't contain 'package.json': ${themeDir}`);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
});
