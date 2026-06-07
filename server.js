require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
const groq = new Groq({apiKey: process.env.Groq_API_KEY});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let currentWorld = null; 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Universa running at http://localhost:${PORT}`));
