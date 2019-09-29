
module.exports = {
  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      // When a connection request is made, output it.
      console.log(`User connection on port ${PORT} : ${socket.id}`);

      // Recieving message
      socket.on('message', (data) => {
        io.emit('message', {user: data.user, msg: data.msg});
      });

      // Joining room
      socket.on('join', (data) => {
        console.log(data.user + " joined " + data.room);
        io.emit('join', {user: data.user, room: data.room});
      });
    });
  }
}
