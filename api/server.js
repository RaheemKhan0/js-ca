import { createServer } from "http";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";
import { WebSocketServer } from "ws";
dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
const usermap = new Map();

console.log(`hostname : ${hostname} , port : ${port}`);

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(filename);
  const url = req?.url;
  const method = req?.method;
  console.log("url : ", url);
  console.log(`method : ${method}`);

  if (method == "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }
  if (method == "GET" && url == "/style.css") {
    console.log("In the styles.css url and returning the css file");
    res.writeHead(200, {
      "content-type": "text/css",
    });
    const cssFile = readFileSync(path.join(dirname, "../frontend/style.css"));
    return res.end(cssFile);
  }

  if (method == "GET" && url == "/client.js") {
    res.writeHead(200, {
      "content-type": "text/javascript",
    });
    const jsFile = readFileSync(path.join(dirname, "../frontend/client.js"));
    return res.end(jsFile);
  }
  if (url == "/" && method == "GET") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    let homepage;
    try {
      homepage = readFileSync(path.join(dirname, "../frontend/index.html"));
    } catch (error) {
      console.log(error);
    }
    return res.end(homepage);
  }
  res.writeHead(404, { "Content-Type": "text/plain" });
  return res.end("Not Found");
});
const wss = new WebSocketServer({ server });
wss.on("connection", function connection(ws) {
  console.log(`socket : ${ws} just joined the server`);
  ws.send(
    JSON.stringify({
      type: "server-announcement",
      content: "Welcome to the Node js Chat Server!",
    }),
  );
  ws.on("message", (data) => {
    const parsedData = JSON.parse(data.toString());
    if (parsedData.type == undefined) throw Error("parsed Data not defined");

    switch (parsedData.type) {
      case "message":
        if (usermap.has(ws)) {
          wss.clients.forEach((client) => {
            if (client != ws) {
              const text = parsedData.content;
              console.log("text : ", text);
              console.log(`${usermap.get(ws)} has sent a message`);
              client.send(
                JSON.stringify({
                  type: "message",
                  content: text,
                  username: ` ${usermap.get(ws)}`,
                }),
              );
            }
          });
        } else {
          throw Error("user does not exist");
        }
        break;
      case "setUserName":
        console.log("recieved username message");
        const username = parsedData.username;
        if (!username) {
          throw Error("user name not provided");
        }
        console.log(`storing username ${username} in the map`);
        usermap.set(ws, username);
        wss.clients.forEach((client) => {
          if (client != ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "join",
                username: usermap.get(ws),
                content: `${ws.username} just joined the chat`,
              }),
            );
          }
        });
        break;
      default:
        console.log(parsedData.type);
        throw Error("this type is not valid");
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
