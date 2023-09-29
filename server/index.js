const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connetDB");
const errorHandler = require("./middleware/errorHandler");

connectDB();
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", cors(), require("./Routes/users"));
app.use("/message", cors(), require("./Routes/message"));
app.use(errorHandler);
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  socket.on("setup", (userId, userName) => {
    socket.join(userId);
    socket.emit("connected");
  });

  socket.on("set-friend", (userId) => {
    if (userId == "") return;
    socket.join(userId);
  });

  // Handle incoming messages
  socket.on("message", (message, userName, room) => {
    // Broadcast the message to all connected clients
    socket.to(room).emit("receive-message", message, userName);
  });
});
