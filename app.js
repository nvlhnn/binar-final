const app = require("./index");
const http = require("http");
const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, async () => {
  console.log(`app listening on port ${port}`);
});
