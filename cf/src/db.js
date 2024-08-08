
function validateComment (comment) {
    if (!comment.nickname) throw new Error('nickname is required');
    if (!comment.email) throw new Error('email is required');
    if (!comment.comment) throw new Error('comment is required');
    if (!comment.ip) comment.ip = "unknown";
    if (!comment.ua) comment.ua = "unknown";
    if (!comment.page_id) throw new Error('page_id is required');
    if (!comment.page_title) throw new Error('page_title is required');
}

export function createComment(DB, comment) {
    try {
        validateComment(comment);
        DB.prepare(`
            INSERT INTO Comment (reply_to, nickname, email, website, comment, ip, ua, page_id, page_title)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .bind(comment.reply_to, comment.nickname, comment.email, comment.website, comment.comment, comment.ip, comment.ua, comment.page_id, comment.page_title)
        .run();
    } catch (e) {
        return e;
    }
    return null;
}

export function getComments(DB, page_id) {
    return DB.prepare(`
        SELECT * FROM Comment WHERE page_id = ? ORDER BY created_time DESC
        LIMIT 10
    `).bind(page_id).all(); // OFFSET ?
}

export function initDB(DB) {
    DB.prepare(`
CREATE TABLE IF NOT EXISTS Comment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reply_to INTEGER,
    nickname TEXT NOT NULL,
    email TEXT NOT NULL,
    website TEXT,
    comment TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    ip TEXT NOT NULL,
    ua TEXT NOT NULL,
    page_id TEXT NOT NULL,
    page_title TEXT NOT NULL,
    created_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_time DATETIME DEFAULT CURRENT_TIMESTAMP
)
        `).run();
}