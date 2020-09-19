const fs = require('fs');
const osTmpdir = require('os-tmpdir');
const rimraf = require('rimraf');
const tempDir = '/walk';
const tempDir1 = '/walk/walk';
const tempFile1 = tempDir + '/temp1.txt';
const tempFile2 = tempDir + '/temp2.txt';
const tempFile3 = tempDir1 + '/temp1.txt';
const tempFile4 = tempDir1 + '/temp2.txt';
const createDir = (dirPath) => {
    fs.mkdirSync(osTmpdir() + dirPath, {recursive: true, mode: '0777'});
};
const createFile = (filePath, fileContent) => {
    fs.writeFile(osTmpdir() + filePath, fileContent, () => {});
};
test('directory contains specified files', async () => {
    const walk = require('utils/walk.js');
    const expectedList = [osTmpdir() + tempFile1, osTmpdir() + tempFile2, osTmpdir() + tempFile3, osTmpdir() + tempFile4];
    createDir(tempDir);
    createDir(tempDir1);
    createFile(tempFile1);
    createFile(tempFile2);
    createFile(tempFile3);
    createFile(tempFile4);
    for await (let value of walk(osTmpdir() + tempDir)) {
        expect(expectedList).toContain(value);
    }
    rimraf(osTmpdir() + tempDir, () => {});
}); 
