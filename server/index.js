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
});

httpServer.listen(4000, () => {
  console.log("Server running on 4000");
});
