const path = require('path');
const ejs = require('ejs');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use('/peerjs', peerServer);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get('/:room', (req, res) => {
  res.status(200).render('home', {
    roomId: req.params.room,
  });
});

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit('user-connected', userId);
    socket.on('message', (message) => {
      io.to(roomId).emit('createMessage', message);
    });
  });
});

// const app = require('./app.js');

server.listen(process.env.PORT, () => {
  console.log('Server is running at port: 3030');
});
