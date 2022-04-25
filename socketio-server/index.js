const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Server var ------------
let latestCodeVersion;
let countClient = 0;

const PORT = 5000;
const MESSAGE_EVENT = "positionMessage";
const REMOVE_USER_MESSAGE_EVENT = "removePositionMessage";



app.get('/', (req, res) => {
  res.send('Hello World');
});

io.on('connection', (socket) => {
  // console.log('a user connected - ', socket.id);  

  // Join a conversation
  const { officeId } = socket.handshake.query;
  socket.join(officeId);

  // Listen for new messages
  socket.on(MESSAGE_EVENT, (data) => {
    // console.log('message: ' + typeof(data));
    io.in(officeId).emit(MESSAGE_EVENT, data);
  });


  socket.on("send_message", (data) => {
    data.agenda && io.sockets.emit('agenda', data.newData);
    data.takingPoints && io.sockets.emit('taking_ponits', data.newD);
    data.action_items && io.sockets.emit('action_items', data.newData);
    // data.not_change_action_items && io.sockets.emit('not_change_action_items', data.newD);
    // data.action_items && io.sockets.emit('action_items', data.newData);
  });





  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    // console.log('remove message: ', socket.id);
    io.in(officeId).emit(REMOVE_USER_MESSAGE_EVENT, {
      left_user: socket.id
    });

    socket.leave(officeId);
  });


});


server.listen(PORT, () => {
  console.log('listening on *:5000');
});