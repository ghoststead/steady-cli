const path = require('path');
const fs = require('fs');

const Database = require('better-sqlite3');

const workdir = require('../utils/workdir');

module.exports = {
    command: 'reset',
    describe: 'Re-initialize the Ghost SQLITE3 database',
    builder: {},

    handler: function (args) {
        workdir.use(args);

        const ghostDb = path.join(process.cwd(), 'content', 'data', 'ghost.db');

        if (!fs.existsSync(ghostDb)) {
            throw new Error(`Ghost database not found: ${ghostDb}`);
        }

        const db = new Database(ghostDb);

        db.exec(`DELETE
                 FROM sessions`);
        db.exec(`DELETE
                 FROM settings
                 WHERE "group" = 'private'
                   AND value = 'site'`);
        db.exec(`UPDATE settings
                 SET value = NULL
                 WHERE key = 'next_update_check'`);
        db.exec(`UPDATE settings
                 SET value = 'ghoststead'
                 WHERE key = 'active_theme'`);
        db.exec(`UPDATE users
                 SET name   = 'ghost-user',
                     slug   = 'ghost-user',
                     email  = 'ghoststead@example.org',
                     status = 'inactive'
                 WHERE id = '1'`);
        db.exec(`UPDATE posts
                 SET updated_by   = 1,
                     created_by   = 1,
                     published_by = 1`);
        db.exec(`UPDATE posts
                 SET created_at   = datetime(0, 'unixepoch'),
                     updated_at   = datetime(0, 'unixepoch'),
                     published_at = datetime(0, 'unixepoch')`);
        db.close();
    }
};