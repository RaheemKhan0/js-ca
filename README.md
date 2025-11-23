# Real-Time Chat Application (Vanilla Node.js + WebSockets)

Lightweight chat system that relies solely on Node.js, the `ws` WebSocket library, and vanilla HTML/CSS/JS. No Express, Socket.IO, or frontend frameworks—this repo exists to understand how WebSockets work under the hood and how to wire up a minimal real-time stack end-to-end.

## Goals

- Learn how the browser WebSocket API talks to a Node.js WebSocket server.
- Explore event-driven patterns (`open`, `message`, `close`, `error`) without higher-level abstractions.
- Understand how to structure a tiny real-time application before layering frameworks in later iterations.

## Features

### Backend (`api/server.js`)

- Pure Node.js HTTP server upgraded to WebSockets via [`ws`](https://github.com/websockets/ws).
- Tracks connected clients and their usernames with a `Map`.
- Broadcasts chat messages and join notifications to everyone else in the room.
- Minimal boilerplate so you can follow the entire real-time flow.

### Frontend (`frontend/`)

- Vanilla HTML/CSS UI with a simple message list and notification area.
- Uses the browser’s native `WebSocket` API to connect, send messages, and react to server events.
- Hides the chat UI until a username is registered, mirroring state on the server.

## Project Structure

```
chat-application/
├── api/
│   └── server.js        # Node.js WebSocket server (ws library)
├── frontend/
│   ├── client.js        # Browser WebSocket client logic
│   ├── index.html       # Chat UI
│   └── style.css        # Styling
├── package.json
└── README.md
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Provide `HOSTNAME` and `PORT` in `.env` (defaults work if already set).
3. Start the server:
   ```bash
   npm run server
   ```
4. Open `http://HOSTNAME:PORT` in your browser and submit a username to join the room.

## Next Steps

Future iterations (Project B, C, …) will layer in Express, Socket.IO, MongoDB, and richer UI/UX. This baseline keeps everything simple so changes in those versions are easier to reason about.
