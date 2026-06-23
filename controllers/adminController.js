import { getAllUsers, getAllWorlds } from "../services/adminService.js";

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
