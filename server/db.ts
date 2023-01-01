import Sqlite3 from 'better-sqlite3';
import path from 'path';

export const database = new Sqlite3(path.join(__dirname, 'link-shortener.db'));

// it is recommended to use WAL mode for better performance in web applications
// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/performance.md
database.pragma('journal_mode = WAL');


export function getCreateDatabaseStatement(db: Sqlite3.Database = database) {
    return db.prepare(`
            CREATE TABLE IF NOT EXISTS short_links (
                shortLink VARCHAR PRIMARY KEY,
                link VARCHAR,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
    `);
}

export function listShortLinksStatement(db: Sqlite3.Database = database) {
    return db.prepare('SELECT * FROM short_links');
}

export function createShortLinkStatement(db: Sqlite3.Database = database) {
    return db.prepare('INSERT INTO short_links (shortLink, link) VALUES (@shortLink, @link)');
}
