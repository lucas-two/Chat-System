module.exports = {
  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      // When a connection request is made, output it.
      console.log(`User connection on port ${PORT} : ${socket.id}`);

      // When we recieve a message, emit it to all sockets
      socket.on('message', (message) => {
        io.emit('message', message);

      });
    });
  }
}
