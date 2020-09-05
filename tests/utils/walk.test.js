const fs = require('fs');
const osTmpdir = require('os-tmpdir');
const rimraf = require('rimraf');
const tempDir = '/walk';
const tempFile1 = tempDir + '/temp1.txt';
const tempFile2 = tempDir + '/temp2.txt';
const createDir = (dirPath) => {
    fs.mkdirSync(osTmpdir() + dirPath, {recursive: true, mode: '0777'});
};
const createFile = (filePath, fileContent) => {
    fs.writeFile(osTmpdir() + filePath, fileContent, () => {});
};
test('directory contains specified files', async () => {
    const walk = require('utils/walk.js');
    const expectedList = [osTmpdir() + tempFile1, osTmpdir() + tempFile2];
    createDir(tempDir);
    createFile(tempFile1);
    createFile(tempFile2);
    for await (let value of walk(osTmpdir() + tempDir)) {
        expect(expectedList).toContain(value);
    }
    rimraf(osTmpdir() + tempDir, () => {});
}); 
