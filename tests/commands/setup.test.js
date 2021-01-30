const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

jest.mock('execa');
jest.mock('decompress');

describe('setup', () => {
    it('should initialize directory', async () => {
        expect.assertions(3);
        console.log = jest.fn;
        fs.renameSync = jest.fn;

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);

        jest.mock('download', () => {
            return jest.fn().mockImplementationOnce(() => {
                const fs = require('fs');
                const path = require('path');

                const currentDir = `${process.cwd() + path.sep}current${path.sep}`;
                fs.mkdirSync(currentDir);
                fs.writeFileSync(`${currentDir + path.sep}README`, '');
            });
        });

        const setup = require('commands/setup');
        expect(setup.command).toBe('setup');
        expect(setup.describe).toBeTruthy();
        expect(setup.builder).toStrictEqual({});

        await setup.handler({workdir: tmpDir});
        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });

    it('should complain directory is not empty', async () => {
        expect.assertions(1);
        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);
        fs.writeFileSync(`${tmpDir + path.sep}README`, '');

        const setup = require('commands/setup');

        await expect(setup.handler({})).rejects.toStrictEqual(
            Error('Current directory is not empty, setup cannot continue.')
        );
        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
});