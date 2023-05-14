const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const {
  getIndividualRoomUsers,
  AddNewUser,
  removeUserFromRoom,
  formatMessage,
} = require("./helpers");

const app = express();
const httpServer = createServer(app);
const PORT = 3003;

app.use(cors());

//Initiate socket
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", ({ userName, room }) => {
    AddNewUser({ userName, room, id: socket.id });

    socket.join(room);

    // Sending welcome message to the user
    socket.emit(
      "message",
      formatMessage("Airtribe", `Welcome to the ${room} channel`)
    );

    const users = getIndividualRoomUsers(room);
    io.to(room).emit("user-list", users);

    // Broadcast if any user joins
    socket.broadcast
      .to(room)
      .emit(
        "message",
        formatMessage("Airtribe", `${userName} joined the channel`)
      );
  });

  socket.on("chat-message", (data) => {
    io.to(data.room).emit("message", data);
  });

  // Broadcast if any user leaves
  socket.on("disconnect", () => {
    const user = removeUserFromRoom(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage("Airtribe", `${user.userName} has left the channel`)
      );
      io.to(user.room).emit("user-list", getIndividualRoomUsers(user.room));
    }
  });
});

httpServer.listen(PORT, (err) => {
  if (err) console.log("There was an issue running the server");
  else console.log("Server is running on port " + PORT);
});
