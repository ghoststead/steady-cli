const fs = require('fs');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const tempDir = '/walk';
const tempDir1 = '/walk/walk';
const tempFile1 = tempDir + '/temp1.txt';
const tempFile2 = tempDir + '/temp2.txt';
const tempFile3 = tempDir1 + '/temp1.txt';
const tempFile4 = tempDir1 + '/temp2.txt';

test('directory contains specified files', async () => {
    const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
    fs.mkdirSync(tmpDir + tempDir1, {recursive: true, mode: '0777'});

    const expectedList = [
        tmpDir + tempFile1, tmpDir + tempFile2, tmpDir + tempFile3, tmpDir + tempFile4
    ];

    for (let path of expectedList) {
        fs.writeFileSync(path, '');
    }

    const walk = require('utils/walk.js');
    for await (let value of walk(tmpDir)) {
        expect(expectedList).toContain(value);
    }

    rimraf.sync(tmpDir);
}); 
