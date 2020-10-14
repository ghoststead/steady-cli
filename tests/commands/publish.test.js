/*eslint-env mocha */
const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const rc = require('utils/rc');

const publishTheme = require('commands/publish-theme');
publishTheme.handler = jest.fn();

console.log = jest.fn;

test('publish', async () => {
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

test('publish verbose', async () => {
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

test('publish no theme', async () => {
    console.error = jest.fn();
    process.exit = jest.fn();

    const publish = require('commands/publish');

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);

    await publish.handler({});
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toBeCalledTimes(1);

    process.chdir(__dirname);
    rimraf.sync(tmpDir);
});

test('publish no theme package.json', async () => {
    console.error = jest.fn();
    process.exit = jest.fn();

    const publish = require('commands/publish');

    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    process.chdir(tmpDir);

    const themeDir = path.join(tmpDir, 'content', 'themes', 'ghoststead');
    fs.mkdirSync(themeDir, {recursive: true});

    await publish.handler({});
    expect(process.exit).toHaveBeenCalledWith(1);
    expect(console.error).toBeCalledTimes(1);

    process.chdir(__dirname);
    rimraf.sync(tmpDir);
});
