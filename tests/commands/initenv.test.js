test('initenv not found', () => {
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
