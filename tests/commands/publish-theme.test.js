test('run', () => {
    const publishTheme = require('commands/publish-theme');
    expect(publishTheme.command).toContain('publish-theme');
    expect(publishTheme.describe).toBeTruthy();
});
