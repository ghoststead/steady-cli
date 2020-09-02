test('dir is empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(!dirIsEmpty(process.cwd())).toBeTruthy();
});

test('dir is not empty', () => {
    const dirIsEmpty = require('utils/dir-is-empty.js');
    expect(dirIsEmpty(process.cwd())).toBeFalsy();
});
