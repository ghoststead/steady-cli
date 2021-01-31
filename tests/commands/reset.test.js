const os = require('os');
const path = require('path');
const fs = require('fs');

const Database = require('better-sqlite3');
const rimraf = require('rimraf');

const reset = require('../../commands/reset');

function createGhostDb(workdir) {
    fs.mkdirSync(path.join(workdir, 'content', 'data'), {recursive: true});
    const db = new Database(path.join(workdir, 'content', 'data', 'ghost.db'));
    db.exec(`CREATE TABLE sessions
                  (
                      "id" INTEGER
                  )`);
    db.exec(`CREATE TABLE settings
                  (
                      "key"   TEXT,
                      "group" TEXT,
                      "value" TEXT
                  )`);
    db.exec(`CREATE TABLE users
                  (
                      "id"     INTEGER,
                      "name"   TEXT,
                      "slug"   TEXT,
                      "email"  TEXT,
                      "status" TEXT
                  )`);
    db.exec(`CREATE TABLE posts
                  (
                      "updated_by"   INTEGER,
                      "updated_at"   TEXT,
                      "created_by"   INTEGER,
                      "created_at"   TEXT,
                      "published_by" INTEGER,
                      "published_at" TEXT
                  )`);
    return db;
}

describe('reset', () => {
    it('should initialize database', () => {
        expect.assertions(3);
        expect(reset.command).toBe('reset');
        expect(reset.describe).toBeTruthy();
        expect(reset.builder).toStrictEqual({});

        const tmpDir = fs.mkdtempSync(os.tmpdir() + path.sep);
        const db = createGhostDb(tmpDir);
        reset.handler({workdir: tmpDir});
        db.close();

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
    it('should fail without database', () => {
        expect.assertions(1);

        const tmpDir = fs.mkdtempSync(fs.realpathSync(os.tmpdir()) + path.sep);
        const ghostDb = path.join(tmpDir, 'content', 'data', 'ghost.db');

        expect(() => {
            reset.handler({workdir: tmpDir});
        }).toThrow(`Ghost database not found: ${ghostDb}`);

        process.chdir(__dirname);
        rimraf.sync(tmpDir);
    });
});
