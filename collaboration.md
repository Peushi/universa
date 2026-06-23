# Collaboration Log - UNIVERSA

This log tracks individual contributions, decisions, trade-offs, and issues found during development.

| Member | Task | Description | Decisions Made | Date |
|--------|------|-------------|----------------|------|
| Karma | Auth middleware | Added `requireAuth` and `requireAdmin` in `middleware/auth.js` to protect logged-in routes and admin-only routes. | Kept them as two separate middleware functions so routes can clearly choose normal user protection or admin protection. | 19/06/2026 |
| Karma | Chat route setup | Added `POST /api/chat` through `routes/chat.js` and `controllers/chatController.js`. The route validates the message, checks message length, checks history format, and makes sure a world exists before chatting. | Used separate validation `if` statements as guard clauses because each invalid case returns immediately and is easier to read. | 19/06/2026 |
| Karma | Groq guide service | Built the chat helper in `services/groqService.js` so the AI guide answers as someone living inside the generated world. | Put the world data into the server-side system prompt so the guide has a source of truth and the frontend does not control the prompt. | 19/06/2026 |
| Karma | Chat history trimming | Added history trimming before sending messages to Groq. | Kept only the latest 20 messages to reduce token overflow and keep the conversation focused on recent context. | 19/06/2026 |
| Karma | Admin route structure | Added admin route/controller/service structure for viewing users and worlds. | Split admin code into route, controller, and service files so the code stays easier to maintain. | 22/06/2026 |
| Karma | Session endpoint | Added a normal `GET /api/me` session route instead of using `/api/admin/me` from frontend pages. | Decided normal pages should not call admin routes just to know who is logged in. This made Explorer and Atlas cleaner. | 22/06/2026 |
| Karma | Explorer page | Built `public/explorer.html` with a protected chat interface, current world summary, quick questions, typing indicator, clear button, and character counter. | Added quick questions to help users start exploring without needing to invent their first prompt. | 23/06/2026 |
| Karma | Atlas page | Built `public/atlas.html` to display generated world data: geography, history, culture, rules, factions, mysteries, and tone. | Matched the Atlas fields to the JSON produced by `WORLD_SYSTEM_PROMPT` instead of inventing different field names. | 23/06/2026 |
| Karma | Frontend styling | Added Explorer and Atlas styling to `public/style.css` using the existing dark cosmic Universa theme. | Reused the same pink/orange/purple palette so the new pages look consistent with login and world creation. | 23/06/2026 |
| Karma | XSS prevention | Rendered chat and Atlas content with `textContent` instead of `innerHTML`. | Avoided Markdown/HTML rendering because AI/user text could contain unsafe HTML and sanitizing would add complexity. | 23/06/2026 |
| Karma | SQLite setup | Added `data/db.js` with `better-sqlite3` and created `users` and `worlds` tables. | Started database migration gradually instead of changing the whole app at once. | 23/06/2026 |

## Dead Ends and Trade-Offs

| Member | Task | Description | Decisions Made | Date |
|--------|------|-------------|----------------|------|
| Karma | Model selector | Considered showing a model selector and model badges in Explorer. | Removed it because it made the app feel too technical instead of a storytelling tool. | 22/06/2026 |
| Karma | Chat history | At first chat history only lived in a JavaScript array. | Added `sessionStorage` so users can open Atlas and return to Explorer without losing the visible conversation. Full database chat history is a later feature. | 23/06/2026 |
| Karma | Atlas loading | Atlas loading screen stayed visible above the loaded content. | Fixed the CSS by making `.hidden` override later display rules. | 23/06/2026 |