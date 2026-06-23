import db from "../data/db.js";

export function getAllUsers() {
    return db.prepare("SELECT id, username, role FROM users").all()
}

export function getAllWorlds() {
    return db
      .prepare("SELECT user_id, data FROM worlds")
      .all()
      .map((r) => ({ userId: r.user_id, world: JSON.parse(r.data) }))
}

export function getSessionInfo(session) {
    return {
        userId: session.userId,
        username: session.username,
        role: session.role,
    };
}