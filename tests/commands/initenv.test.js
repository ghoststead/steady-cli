const fs = require('fs');
const rimraf = require('rimraf');

test('.env not', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});
    expect(initenv.handler()).toBeUndefined();
    expect(mockExit).toHaveBeenCalledWith(1);
    console.error = originalError;
});

test('.env exists', () => {
    const initenv = require('commands/initenv');
    expect(initenv.command).toBe('initenv');
    expect(initenv.describe).toBeTruthy();
    expect(initenv.builder).toStrictEqual({});
    expect(fs.existsSync('.env')).toBeTruthy();
    fs.rename('.env','.envtmp',() => {});
    rimraf('.env', () => {});
    expect(initenv.handler()).toBeUndefined();
    fs.rename('.envtmp','.env',() => {});
    rimraf('.envtmp', () => {});
    expect(fs.existsSync('.env')).toBeTruthy();
});

