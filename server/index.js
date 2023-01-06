const httpServer = require("http").createServer();
const cors = require("cors");
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

httpServer.listen(4000, () => {
  console.log("Server running on 4000");
});
