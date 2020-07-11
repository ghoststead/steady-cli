--
-- sqlite3 content/data/ghost.db < scripts/reset-ghost.db.sql
--
DELETE FROM sessions;

DELETE FROM settings WHERE "group" = 'private' AND value = 'site';
UPDATE settings SET value = NULL WHERE key = 'next_update_check';

UPDATE users SET name = 'ghost-user', email = 'ghoststead@example.org', status = 'inactive' WHERE id = '1';
