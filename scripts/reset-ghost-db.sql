--
-- sqlite3 content/data/ghost.db < scripts/reset-ghost.db.sql
--
DELETE FROM sessions;

DELETE FROM settings WHERE "group" = 'private' AND value = 'site';
UPDATE settings SET value = NULL WHERE key = 'next_update_check';

UPDATE users SET name = 'ghost-user', slug = 'ghost-user', email = 'ghoststead@example.org', status = 'inactive' WHERE id = '1';
UPDATE posts SET updated_by = 1, created_by = '1', published_by = '1';
UPDATE posts SET created_at = datetime('now'), updated_at = datetime('now'), published_at = datetime('now');
