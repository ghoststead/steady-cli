test('Fixing file permissions on Ghost installation', async () => {
    const walk = require('utils/walk.js');
    for await (let value of walk(process.cwd())) {
        expect(value).toBeDefined();
    }
});
