const fs = require('fs');
const tempDir = '/temp';
const tempFile1 = tempDir + '/temp1.txt';
const tempFile2 = tempDir + '/temp2.txt';
const createDir = (dirPath) => {
    fs.mkdirSync(process.cwd() + dirPath, {recursive: true, mode: '0777'}, (err) => {
        if (err) {
            console.error('An error occurred: ', err);
        }
    });
};
const createFile = (filePath, fileContent) => {
    fs.writeFile(process.cwd() + filePath, fileContent, (err) => {
        if (err) {
            console.error('An error occured: ', err);
        }
    });
};
const removeDir = (dirPath) => {
    if (fs.existsSync(dirPath)) {
        const files = fs.readdirSync(dirPath);
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs.statSync(dirPath + '/' + filename).isDirectory()) {
                    removeDir(dirPath + '/' + filename);
                } else {
                    fs.unlinkSync(dirPath + '/' + filename);
                }
            });
            fs.rmdirSync(dirPath);
        } else {
            fs.rmdirSync(dirPath);
        }
    }
};

test('directory contains files specifided files', async () => {
    const walk = require('utils/walk.js');
    const expectedList = [process.cwd() + tempFile1, process.cwd() + tempFile2];
    createDir(tempDir);
    createFile(tempFile1);
    createFile(tempFile2);
    for await (let value of walk(process.cwd() + tempDir)) {
        expect(expectedList).toContain(value);
    }
    removeDir('temp');
}); 
