//const server = require("http").createServer()
const http = require('http');
const hostname = '68.183.220.159';
const port = 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Online Siparis Sistemi!\n');
});

let counter = 0;
const io = require("socket.io")(server)
io.on("connection", (socket) => {
  socket.emit("connection_count", { count: counter })

  socket.on("update", function (data) {
    if (data.addjob) {
      console.log(`Yeni İş Oluştu`)
      console.log(data)
      io.emit("refreshjoblist", { refresh_list: true })
    }
  })
  socket.on("disconnect", function () {
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});