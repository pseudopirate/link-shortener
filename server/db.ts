import Sqlite3 from 'better-sqlite3';
import path from 'path';

export const database = new Sqlite3(path.join(__dirname, 'link-shortener.db'));

// it is recommended to use WAL mode for better performance in web applications
// https://github.com/WiseLibs/better-sqlite3/blob/master/docs/performance.md
database.pragma('journal_mode = WAL');


export function createTables(db: Sqlite3.Database = database) {
    return db.exec(`
        BEGIN;
            CREATE TABLE IF NOT EXISTS short_links (
                shortLink VARCHAR PRIMARY KEY,
                link VARCHAR,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS statistics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                shortLink VARCHAR,
                FOREIGN KEY(shortLink) REFERENCES short_links(shortLink)
            );
        COMMIT;
    `);
}

export function listShortLinksStatement(db: Sqlite3.Database = database) {
    return db.prepare('SELECT * FROM short_links');
}


export function getShortLinksStatement(db: Sqlite3.Database = database) {
    return db.prepare('SELECT * FROM short_links WHERE shortLink = ?');
}


export function createShortLinkStatement(db: Sqlite3.Database = database) {
    return db.prepare('INSERT INTO short_links (shortLink, link) VALUES (@shortLink, @link)');
}

export function closeConnection(db: Sqlite3.Database = database) {
    db.close();
}

export function createShortLinkVisitStatement(db: Sqlite3.Database = database) {
    return db.prepare('INSERT INTO statistics (shortLink) VALUES (@shortLink)');
}


export function listShortLinkVisitsStatement(db: Sqlite3.Database = database) {
    return db.prepare('SELECT * FROM statistics WHERE shortLink = ?');
}

function deleteShortLinkStatement(db: Sqlite3.Database = database) {
    return db.prepare('DELETE FROM short_links WHERE shortLink = ?');
}

function deleteShortVisitsStatement(db: Sqlite3.Database = database) {
    return db.prepare('DELETE FROM statistics WHERE shortLink = ?');
}

export function deleteShortLink(shortLink: string, db: Sqlite3.Database = database) {
    return db.transaction(() => {
        deleteShortVisitsStatement().run(shortLink);
        deleteShortLinkStatement().run(shortLink);
    });
}

