const app = require("./index");
const http = require("http");
const port = process.env.PORT;
const socketio = require("socket.io");
const auth = require("./middlewares/auth");

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

// io.use(auth);
global.io = io;

io.on("connection", (socket) => {
  socket.on("setUser", function (id) {
    socket.join(id);
    console.log("user telah terhubung dengan id", id);
  });
});

server.listen(port, async () => {
  console.log(`app listening on port ${port}`);
});
