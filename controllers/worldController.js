import {generateWorld} from  "../services/groqService.js"
import {worlds} from "../data/store.js"

export async function createWorld(req, res) {
    const {premise, model} = req.body
 
    if(!premise || premise.trim().length === 0) {
        return res.status(400).json({error: "Premise cannot be empty"})
    }

    try {
        const result = await generateWorld({premise, model});
        const worldData = JSON.parse(result.raw);
        worldData.lore = []
        worlds.set(req.session.userId, worldData);
        res.json({world: worldData, modelUsed: result.modelUsed});
    } catch (err) {
        console.error("Error creating world:", err);
        res.status(500).json({error: "Failed to create world"});
    }
}

