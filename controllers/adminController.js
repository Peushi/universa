import { getAllUsers, getAllWorlds, getSessionInfo } from "../services/adminService.js";

export function getMe(req, res) {
    try {
        const info = getSessionInfo(req.session);
        res.json(info);
    } catch (err) {
        console.error('getMe error: ', err);
        res.status(500).json({ error: 'Could not retrieve session information.' });
    }
}

export function getUsers(req, res) {
    try {
        const allUsers = getAllUsers();
        res.json({ count: allUsers.length, users: allUsers });
    } catch (err) {
        console.error('getUsers error: ', err);
        res.status(500).json({ error: "Could not retrieve users." });
    }
}

export function getWorlds(req, res) {
  try {
    const allWorlds = getAllWorlds()
    res.json({ count: allWorlds.length, worlds: allWorlds })
  } catch (err) {
    console.error("getWorlds error: ", err)
    res.status(500).json({ error: "Could not retrieve worlds." })
  }
}
