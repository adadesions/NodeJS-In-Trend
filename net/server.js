// Server
const net = require('net');

const _PORT = 9009;

let server = net.createServer(function (socket) {
  socket.write('Ada\'s Server');
  socket.pipe(socket);

  socket.on('data', (data) => {
    console.log(`Server: ${data}`);
  });
});
server.listen(_PORT, 'localhost');
