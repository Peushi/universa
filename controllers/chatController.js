import { chat } from "../services/groqService.js"
import db from "../data/db.js"
   
export async function sendMessage(req, res) {
    const { message, history = [] } = req.body
    if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: "Message cannot be empty" })
    }
    if (message.length > 2000) {
        return res
            .status(400)
            .json({ error: "Message is too long. Maximum 2000 characters." })
    }
    if (!Array.isArray(history)) {
        return res.status(400).json({ error: "History must be an array." })
    }
    const row = db.prepare("SELECT data FROM worlds WHERE user_id = ?").get(req.session.userId)
    const world = row ? JSON.parse(row.data) : null
    
    if (!world) {
        return res.status(404).json({ error: 'No world found. Please generate a world first before stating a conversation' })
    }
    const reply = await chat({ message, history, world });
    res.json({ reply: reply.reply });
}
