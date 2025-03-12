const express = require('express')
const cors = require('cors')
const { createServer } = require('node:http')
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const prisma=new PrismaClient()
const app = express()
const server = createServer(app)

// ✅ Fix CORS for WebSockets
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ WebSocket Handling
io.on("connection", (socket) => {
    console.log(`🟢 User Connected: ${socket.id}`);

    socket.on("surveyUpdate", async (data) => {
      console.log("📡 Received survey update:", data);
      try {
        const savedSurvey=await prisma.user.update({
          where:{
            email:"test@gmail.com"
          },
          data:{
            questions:data.questions,
            survey_id:"1d9306e6-fd96-11ef-a9d8-6fdcda4efa69"
          }
        })
        socket.broadcast.emit("surveyUpdate", data)
        return 
      } catch (error) {
        console.error("❌ Error sending message to DB:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 User Disconnected: ${socket.id}`);
    });
});

app.use('/api', require('./routes/index'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
