const os = require('os');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

describe('initrc', () => {
    it('should create initrc', () => {
        expect.assertions(5);
        const initrc = require('commands/initrc');
        expect(initrc.command).toBe('initrc');
        expect(initrc.describe).toBeTruthy();
        expect(initrc.builder).toStrictEqual({});

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);
        expect(initrc.handler({})).toBeUndefined();
        expect(fs.existsSync(`${tmpDir + path.sep}.steadyrc`)).toBeTruthy();
        rimraf.sync(tmpDir);
    });

    it('should complain .steadyrc exists', () => {
        expect.assertions(4);
        jest.spyOn(console, 'error').mockImplementation();

        const initrc = require('commands/initrc');
        expect(initrc.command).toBe('initrc');
        expect(initrc.describe).toBeTruthy();
        expect(initrc.builder).toStrictEqual({});

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        process.chdir(tmpDir);
        fs.writeFileSync(`${tmpDir + path.sep}.steadyrc`, '');

        expect(() => {
            initrc.handler({workdir: '.'});
        }).toThrow('.steadyrc already exists.');
        rimraf.sync(tmpDir);
    });
});
