import { Socket } from "socket.io";
import Game from "./server/class/game";

const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

let waitingUserSocket: Socket | null = null;

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  Game.setIo(io);

  io.on("connection", (socket) => {
    if (waitingUserSocket) {
      const game = new Game([socket, waitingUserSocket]);
      waitingUserSocket = null;
    } else {
      waitingUserSocket = socket;
    }
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
