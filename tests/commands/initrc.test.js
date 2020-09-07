test('initrc not found', () => {
    const originalError = console.error;
    console.error = jest.fn();
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });
    const initrc = require('commands/initrc');
    expect(initrc.command).toBe('initrc');
    expect(initrc.describe).toBeTruthy();
    expect(initrc.builder).toStrictEqual({});
    expect(initrc.handler()).toBeUndefined();
    expect(mockExit).toHaveBeenCalledWith(1);
    console.error = originalError;
});
