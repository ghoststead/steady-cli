/*eslint-env mocha */
const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const rc = require('utils/rc');

const publishTheme = require('commands/publish-theme');
jest.spyOn(publishTheme, 'handler').mockImplementation();

console.log = jest.fn;
jest.spyOn(console, 'error').mockImplementation();

describe('publish', () => {
    it('should publish', async () => {
        expect.assertions(3);
        const publish = require('commands/publish');
        expect(publish.command).toContain('publish');
        expect(publish.describe).toBeTruthy();

        const tmpDir = fs.realpathSync(fs.mkdtempSync(os.tmpdir() + path.sep));
        const themeDir = path.join(tmpDir, 'content', 'themes', 'ghoststead');
        fs.mkdirSync(themeDir, {recursive: true});
        fs.writeFileSync(
            path.join(themeDir, 'package.json'),
            JSON.stringify({
                name: 'tested',
                version: '0.0.0'
            })
        );
        process.chdir(tmpDir);
        const expectedPath = path.join(themeDir, 'dist', 'tested-0.0.0.zip');

        await publish.handler({workdir: '.'});
        expect(publishTheme.handler).toHaveBeenCalledWith({
            path: expectedPath
        });

        rimraf.sync(tmpDir);
    });

    it('should publish verbose', async () => {
        expect.assertions(3);
        rc.config = {workDir: '.'};

        const publish = require('commands/publish');
        expect(publish.command).toContain('publish');
        expect(publish.describe).toBeTruthy();

        const tmpDir = fs.realpathSync(fs.mkdtempSync(os.tmpdir() + path.sep));
        const themeDir = path.join(tmpDir, 'content', 'themes', 'ghoststead');
        fs.mkdirSync(themeDir, {recursive: true});
        fs.writeFileSync(
            path.join(themeDir, 'package.json'),
            JSON.stringify({
                name: 'tested',
                version: '0.0.0'
            })
        );
        process.chdir(tmpDir);
        const expectedPath = path.join(themeDir, 'dist', 'tested-0.0.0.zip');

        await publish.handler({verbose: true});
        expect(publishTheme.handler).toHaveBeenCalledWith({
            path: expectedPath,
            verbose: true
        });

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
        rc.config = {};
    });

    it('should fail without a theme', async () => {
        expect.assertions(2);
        jest.spyOn(process, 'exit').mockImplementation();

        const publish = require('commands/publish');

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);

        await publish.handler({});
        expect(process.exit).toHaveBeenCalledWith(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
        console.error.mockClear();
    });

    it('should fail without a theme package.json file', async () => {
        expect.assertions(2);
        jest.spyOn(process, 'exit').mockImplementation();

        const publish = require('commands/publish');

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);

        const themeDir = path.join(tmpDir, 'content', 'themes', 'ghoststead');
        fs.mkdirSync(themeDir, {recursive: true});

        await publish.handler({});
        expect(process.exit).toHaveBeenCalledWith(1);
        expect(console.error).toHaveBeenCalledTimes(1);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
        console.error.mockClear();
    });
});
