import { chat } from "../services/groqService.js"
   
export async function sendMessage(req, res) {
    const { message, history = [], model } = req.body
    if (!message || message.trim().length === 0) {
        return res.status(400).json({ error: "Message cannot be empty" })
    }
    if (message.length > 2000) {
        return res
            .status(400)
            .json({ error: "Message is too long. Maximum 2000 characters." })
    }
    const world = worlds.get(req.session.userId);
    if (!world) {
        return res.status(404).json({ error: 'No world found. Please generate a world first before stating a conversation' })
    }
    const reply = await chat({ message, history, model, world });
    res.json({ reply, modelUsed: reply.modelUsed });
}
