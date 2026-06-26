```markdown
# Universa — AI-Powered World-Building Companion

Universa is a web application that lets you build a complete fictional 
universe from a single sentence. Describe your world in one premise and 
Universa generates the full lore — geography, history, culture, factions, 
and mysteries. Then explore it through a conversational AI guide who speaks 
as if they actually live there.

Built for writers, RPG game masters, game developers, and storytellers.

---

## Demo

https://youtu.be/cMi-1c7yWRQ

---

## Tech Stack

- **Backend:** Node.js + Express
- **Frontend:** Vanilla JS, HTML, CSS
- **Database:** SQLite (sqlite3 + sqlite)
- **AI:** Groq API (llama-3.1-8b-instant)
- **Auth:** express-session + bcrypt

---

## Project Structure

```
universa/
├── server.js                  — Express app, middleware, route mounting
├── .env                       — API keys and session secret (not committed)
├── .gitignore
├── package.json
├── data/
│   ├── db.js                  — SQLite connection and table setup
│   └── store.js               — Original in-memory store (kept for reference)
├── controllers/
│   ├── authController.js      — Register, login, logout
│   ├── worldController.js     — Create and fetch world
│   └── chatController.js      — Chat with world guide
├── routes/
│   ├── auth.js                — /api/auth routes
│   ├── world.js               — /api/world routes
│   └── chat.js                — /api/chat routes
├── middleware/
│   └── auth.js                — requireAuth and requireAdmin
├── services/
│   ├── groqService.js         — Groq API calls, system prompts
│   └── adminService.js        — Admin queries
└── public/
    ├── index.html             — World creation page
    ├── login.html             — Login and register page
    ├── explorer.html          — Chat with world guide
    ├── atlas.html             — View full world lore
    └── style.css              — Shared styles
```

---

## Getting Started

### Prerequisites
- Node.js v18 or higher
- A free Groq API key from https://console.groq.com

### Installation

```bash
git clone https://github.com/Peushi/universa.git
cd universa
npm install
```

### Environment Setup

Create a `.env` file in the root folder:

```
GROQ_API_KEY=your_groq_api_key_here
SESSION_SECRET=your_random_secret_here
PORT=3000
```

### Run the App

```bash
node server.js
```

Then open http://localhost:3000 in your browser.

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | No | Create a new account |
| POST | /api/auth/login | No | Login and start session |
| POST | /api/auth/logout | Yes | Destroy session |
| POST | /api/world | Yes | Generate world from premise |
| GET | /api/world | Yes | Fetch current world data |
| POST | /api/chat | Yes | Chat with world guide |
| GET | /api/admin/users | Admin | List all users |
| GET | /api/admin/worlds | Admin | List all worlds |

---

## Team

| Member | Responsibilities |
|--------|-----------------|
| Peushi | Auth system, world creation endpoint, SQLite migration, login and world creation pages, A-innovation.docx, C-data-privacy.docx |
| Karma | Chat system, explorer and atlas pages, Groq guide service, auth middleware, admin routes, SQLite migration, B-conception.docx, D-security.docx |

---

## Documents

| File | Author | Description |
|------|--------|-------------|
| A-innovation.docx | Peushi | Innovation analysis and market research |
| B-conception.docx | Karma | Architecture diagrams and project management |
| C-data-privacy.docx | Peushi | GDPR analysis and privacy measures |
| D-security.docx | Karma | Security threats and countermeasures |
| GenAI-log.docx | Both | Log of all AI tool usage |
| collaboration-log.md | Both | Individual contributions and decisions |

---
