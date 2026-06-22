import { chat } from "../services/groqService.js"
import { worlds } from "../data/store.js"
   
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
    const world = worlds.get(req.session.userId);
    if (!world) {
        return res.status(404).json({ error: 'No world found. Please generate a world first before stating a conversation' })
    }
    const reply = await chat({ message, history, world });
    res.json({ reply: reply.reply });
}
