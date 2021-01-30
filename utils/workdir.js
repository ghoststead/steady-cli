const rc = require('./rc');
const stat = require('./stat');

/* Ensure workdir exists and is a directory */
function check(dir) {
    const stats = stat(dir);
    if (!stats) {
        throw new Error(`The specified workdir does not exist: ${dir}`);
    }

    if (!stats.isDirectory()) {
        throw new Error(`The specified workdir exists but is not a directory: ${dir}`);
    }
}

/* Switch to workdir (if specified) */
function use(args) {
    if (args.workdir) {
        check(args.workdir);
        process.chdir(args.workdir);
    } else if (rc.config.workDir) {
        check(rc.config.workDir);
        process.chdir(rc.config.workDir);
    }
}

module.exports = {
    check,
    use
};
