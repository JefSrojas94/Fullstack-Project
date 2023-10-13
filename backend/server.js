const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const ChatRoutes = require("./routes/ChatRoutes");
const MessageRoutes = require("./routes/MessageRoutes");
const { disconnect } = require("process");

app.use(express.json());
app.use(cors());

app.use("/chat/api/v1/users", UserRoutes);
app.use("/chat/api/v1/chats", ChatRoutes);
app.use("/chat/api/v1/messages", MessageRoutes);

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(`server running on port: ${port}`);
});

const server = http.createServer(app);

server.listen(3001);
//// SOCKET FROM HERE

const io = require("socket.io")(server, {
  cors: {
    origin: "https://6526187f1419ad78e71e5c3b--bucolic-stardust-72dee4.netlify.app",
  },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New Connection: ", socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    
    io.emit("getOnlineUsers", onlineUsers);
  });
  // add message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead:false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection fail: ", error.message));
