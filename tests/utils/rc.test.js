const cosmiconfig = require('cosmiconfig');

describe('rc', () => {
    it('should contain expected values', () => {
        expect.assertions(2);
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

    it('should not be found', () => {
        expect.assertions(2);
        const originalError = console.error;
        jest.spyOn(console, 'error').mockImplementation();

        const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {
        });

        const rc = require('utils/rc.js');
        expect(rc.require('bar')).toBeUndefined();
        expect(mockExit).toHaveBeenCalledWith(1);
        console.error = originalError;
    });
});

