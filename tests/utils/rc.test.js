const cosmiconfig = require('cosmiconfig');

test('rc', () => {
    const sync = {
        search: () => ({
            config: {foo: 'baz'}
        })
    };

    jest.spyOn(cosmiconfig, 'cosmiconfigSync').mockImplementation(() => sync);

    const rc = require('utils/rc.js');
    expect(rc.config.foo).toBe('baz');
    expect(rc.require('foo')).toBe('baz');
});

test('rc not found', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
    });

    const rc = require('utils/rc.js');
    expect(rc.require('bar'));
    expect(mockExit).toHaveBeenCalledWith(1);
    console.error = originalError;
});

