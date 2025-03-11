import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT } from "./config.js";
import { redisClient } from "./redisClient.js"; // Optional

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Store active users
const users = {};

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userList", Object.values(users));
  });

  socket.on("message", async ({ sender, message }) => {
    if (redisClient) {
      await redisClient.lPush("messages", JSON.stringify({ sender, message }));
    }
    io.emit("message", { sender, message });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
