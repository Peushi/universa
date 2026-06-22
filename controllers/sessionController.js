import { getSessionInfo } from "../services/adminService.js";

export function getMe(req, res) {
    try {
        const info = getSessionInfo(req.session);
        res.json(info);
    } catch (err) {
        console.error("getMe error: ", err);
        res.status(500).json({ error: "Could not retrieve session information." });
    }
}
