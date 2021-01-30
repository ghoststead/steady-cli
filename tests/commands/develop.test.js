const fs = require('fs');
const os = require('os');
const path = require('path');

const rimraf = require('rimraf');

const theme = require('../../utils/theme');

jest.mock('execa');

describe('develop', () => {
    it('should run', () => {
        expect.assertions(4);

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        const themeDir = theme.fullpath('ghoststead', {cwd: tmpDir});
        fs.mkdirSync(themeDir, {recursive: true});

        const packageJson = path.resolve(themeDir, 'package.json');
        fs.closeSync(fs.openSync(packageJson, 'w'));

        const develop = require('commands/develop');
        expect(develop.command).toBe('develop');
        expect(develop.describe).toBeTruthy();
        expect(develop.builder).toStrictEqual({});
        expect(develop.handler({workdir: tmpDir})).toBeUndefined();

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
});
