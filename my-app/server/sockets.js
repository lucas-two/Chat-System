module.exports = {
  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      // When a connection request is made, output it.
      console.log(`User connection on port ${PORT} : ${socket.id}`);

      // Joining a group channel
      socket.on('join', (data) => {
        socket.join(data.room);

        console.log(data.user + "joined" + data.room);

        // Send to everyone except person joining
        socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: 'has joined the room'});
      });

      // When we recieve a message, emit it to all sockets
      socket.on('message', (message) => {
        io.emit('message', message);

      });
    });
  }
}
