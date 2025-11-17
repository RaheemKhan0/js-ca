Real-Time Chat Application – Vanilla Node.js (WebSockets)

This project is a simple real-time chat application built using pure WebSockets — without Express, Socket.io, or any frontend frameworks.
The goal of this project is to deeply understand:

How WebSockets work at a low level

How to handle real-time communication in Node.js

How browser WebSocket clients communicate with a WebSocket server

Event-driven architecture (message, open, close, error)

How to structure a minimal real-time application

This is the first version of the chat system (Project A).
Later versions will use Express, Socket.io, and MongoDB.

Features
Backend (Node.js + ws library)

WebSocket server built using the ws package

Handles client connections and disconnections

Broadcasts messages to all connected clients

Event-driven message handling

Minimal and framework-free implementation to show how real-time systems actually work

Frontend (HTML, CSS, JavaScript)

Built using vanilla HTML, CSS, and JS

Connects using the browser's native WebSocket API

Sends messages to the server

Receives real-time messages from other users

Displays chat messages dynamically on the page

Project Structure
chat-app/
│
├── api/
        server.js          # Node.js WebSocket server (using ws library)
└── public/
      ├── index.html   # Chat UI
      ├── style.css    # Optional styling
      └── client.js    # WebSocket client logic (vanilla JS)

