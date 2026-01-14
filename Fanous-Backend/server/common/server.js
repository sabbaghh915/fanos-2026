import express from "express";
import mongoose from "mongoose";
import http from "http";
import path, { dirname } from "path";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Server as SocketIOServer } from "socket.io";
import WebSocketPkg from "websocket"; // ✅ Import كامل للمكتبة
import { fileURLToPath } from "url";

import apiErrorHandler from "../helper/apiErrorHandler.js";
import userController from "../api/v1/controllers/user/controller.js";
import chatController from "../api/v1/controllers/socket/controller.js";
import userModel from "../models/user.js";

// Helpers
const WebSocketServer = WebSocketPkg.server;
const WebSocketClient = WebSocketPkg.client;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
const root = path.resolve(__dirname, "../..");

// Setup classic websocket server
const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
  maxReceivedFrameSize: 64 * 1024 * 1024,
  maxReceivedMessageSize: 64 * 1024 * 1024,
  fragmentOutgoingMessages: false,
  keepalive: false,
  disableNagleAlgorithm: false
});

const client = new WebSocketClient();

// Store online users
let onlineUsers = [];

class ExpressServer {
  constructor() {
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(cors());
    app.use(morgan('dev'));
  }

  router(routes) {
    routes(app);
    return this;
  }

  configureSwagger(swaggerDefinition) {
    const options = {
      swaggerDefinition,
      apis: [
        path.resolve(root, "server/api/v1/controllers/**/*.js"),
        path.resolve(root, "api.yaml"),
      ],
    };
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));
    return this;
  }

  handleError() {
    app.use(apiErrorHandler);
    return this;
  }

async configureDb(dbUrl) {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connected");
    return this;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}


  listen(port) {
    server.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });
    this.setupSocketEvents();
    this.setupWebSocketEvents();
    return app;
  }

  setupSocketEvents() {
    io.on("connection", (socket) => {
      console.log("⚡ New Socket.io connection:", socket.id);

      socket.on("oneToOneChat", async (data) => {
        try {
          const chatSend = await chatController.oneToOneChat(data);
          const recipients = onlineUsers.filter(u => [data.senderId, data.receiverId].includes(u.userId));

          recipients.forEach((user) => {
            io.to(user.socketId).emit("oneToOneChat", {
              response_code: chatSend.response_code,
              response_message: chatSend.response_message,
              result: chatSend.result,
              chatHistory: user.userId === data.receiverId ? chatSend.chatHistory : chatSend.senderHistory,
            });
          });

          if (recipients.length === 0) {
            io.to(socket.id).emit("oneToOneChat", chatSend);
          }
        } catch (err) {
          console.error("Error in oneToOneChat:", err);
        }
      });

      socket.on("onlineUser", async (data) => {
        try {
          const user = await userModel.findById(data.userId);
          if (user) {
            const existing = onlineUsers.find(u => u.userId === user._id.toString());
            if (!existing) {
              onlineUsers.push({
                userId: user._id.toString(),
                socketId: socket.id,
                status: "ONLINE",
                userName: user.userName || "",
              });
            }
          }
        } catch (err) {
          console.error("Error setting online user:", err);
        }
      });

      socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(u => u.socketId !== socket.id);
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }

  setupWebSocketEvents() {
    wsServer.on("request", (request) => {
      const connection = request.accept(null, request.origin);
      console.log("✅ WebSocket client connected");

      connection.on("message", async (message) => {
        try {
          const data = JSON.parse(message.utf8Data);

          if (data.requestType === "NotificationList") {
            const notifications = await userController.getNotificationList(data.token);
            connection.sendUTF(JSON.stringify(notifications));
          }

          if (data.user_token) {
            const msgCount = await chatController.messageReceiveUserCount(data.user_token);
            connection.sendUTF(JSON.stringify(msgCount.responseResult));
          }

          if (data.type === "ChatHistory") {
            const chatHistory = await chatController.chatHistoryWebSocket(data);
            connection.sendUTF(JSON.stringify(chatHistory));
          }
        } catch (err) {
          console.error("WebSocket message error:", err);
        }
      });

      connection.on("close", () => {
        console.log("❌ WebSocket client disconnected");
      });
    });

    client.on("connect", (connection) => {
      console.log("🔗 Connected to external WebSocket server");
      connection.on("error", (error) => console.error("Client error:", error));
      connection.on("close", () => console.log("Client WebSocket connection closed"));
    });

    client.connect('ws://localhost:3032');
  }
}

function originIsAllowed(origin) {
  return true;
}

export default ExpressServer;
