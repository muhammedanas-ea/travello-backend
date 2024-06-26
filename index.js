import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import adminRoute from "./routes/AdminRoute.js";
import propertyRoute from "./routes/PropertyRoute.js";
import { Server } from "socket.io";
import { corsOptions } from "./utils/config/corsOption.js";
import { allowedOrigins } from "./utils/config/allowedOrigins.js";

const app = express();

env.config();
mongoose
  .connect(process.env.mongo_url)
  .then(() => {
    console.log("mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors(corsOptions));

app.use("/files", express.static("public"));

app.use("/", userRoute);
app.use("/admin", adminRoute);
app.use("/property", propertyRoute);

const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log(`server is running ${port}`);
});
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: allowedOrigins,
  },
});
io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined in the room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    const chat = newMessageRecieved.chat;

    const senderUserId = newMessageRecieved.sender.user
      ? newMessageRecieved.sender.user
      : newMessageRecieved.sender.owner;

    Object.keys(chat.users).forEach((userKey) => {
      const user = chat.users[userKey];
      if (user !== senderUserId) {
        const access = user.user ? user.owner : user.user;
        console.log(access, "is get ing");
        socket.to(access).emit("message received", newMessageRecieved);
      }
    });
  });
});
