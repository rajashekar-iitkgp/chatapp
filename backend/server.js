import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT } from "./config.js";
import redisClient from "./redisClient.js"; // Redis client
import { v4 as uuidv4 } from "uuid"; // Generate unique message IDs

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

// Check Redis Connection
const checkRedisConnection = async () => {
  try {
    const pong = await redisClient.ping();
    console.log("✅ Redis Ping Response:", pong); // Should print "PONG"
  } catch (error) {
    console.error("❌ Redis Connection Failed:", error);
  }
};

// Store active users
const users = {};
const pendingMessages = {}; // Store temporarily dropped messages

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join", (username) => {
    users[socket.id] = username;
    io.emit("userList", Object.values(users));
  });

  socket.on("message", async ({ sender, message, messageId }) => {
    try {
      // Simulate 50% message drop
      if (Math.random() < 0.5) {
        console.log(`❌ Dropped message from ${sender}`);
        pendingMessages[messageId] = { sender, message };
        return; // Simulating network loss
      }

      // Store message in Redis
      if (redisClient.isReady) {
        await redisClient.lPush("messages", JSON.stringify({ sender, message, messageId }));
      }

      io.emit("message", { sender, message, messageId });
      delete pendingMessages[messageId]; // Remove from pending list if delivered
    } catch (err) {
      console.error("❌ Redis Error:", err);
    }
  });

  // Resend undelivered messages on reconnect
  socket.on("resendMessages", () => {
    Object.entries(pendingMessages).forEach(([messageId, { sender, message }]) => {
      socket.emit("message", { sender, message, messageId });
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("userList", Object.values(users));
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start the server and check Redis
httpServer.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await checkRedisConnection();
});
