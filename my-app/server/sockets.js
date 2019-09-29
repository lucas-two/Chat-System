module.exports = {
  connect: function(io, PORT) {

    io.on('connection', (socket) => {
      // When a connection request is made, output it.
      console.log(`User connection on port ${PORT} : ${socket.id}`);

      // Joining room
      socket.on('join', (data) => {
        console.log(data.user + " joined " + data.room);

        socket.broadcast.to(data.room).emit('new user joined', {user: data.user, message: 'has joined the room'});
      });

      // Leaving room
      socket.on('leave', (data) => {
        console.log(data.user + " left " + data.room);

        socket.broadcast.to(data.room).emit('left room', {user: data.user, message: 'has left the room'});

        socket.leave(data.room);
      });
    });
  }
}
