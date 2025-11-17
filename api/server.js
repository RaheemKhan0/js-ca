import { createServer } from "http";
import dotenv from "dotenv";

dotenv.config();

const hostname = process.env.HOSTNAME;
const port = process.env.PORT;
console.log(`hostname : ${hostname} , port : ${port}`);

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  url = req.url;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
