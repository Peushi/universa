import { users, worlds } from "../data/store.js";

export function getAllUsers() {
    return [...users.values()].map(u => ({
        id: u.id,
        username: u.username,
        role: u.role,
    }));
}

export function getAllWorlds() {
    return [...worlds.entries()].map(([userId, world]) => ({
        userId, world,
    }));
}

export function getSessionInfo(session) {
    return {
        userId: session.userId,
        username: session.username,
        role: session.role,
    };
}