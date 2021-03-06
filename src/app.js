const express = require('express');
const http = require('http');
const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const cors = require('cors');
// const io = socketio(server);
require('dotenv').config();
app.use(cors());
//import auth routes
const authRoute = require('./routes/auth');
const usergetRoute = require('./routes/user_get_actions');
const userpostRoute = require('./routes/user_post_actions');
// const { addPlayer, getPlayer, getPlayerInRoom, removePlayer, } = require('./players');
//bodyparser
app.use('/uploads',express.static('uploads'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: false,limit: '50mb'}));
app.use(authRoute);
app.use(usergetRoute);
app.use('/api/actions',userpostRoute);

const io = require("socket.io")(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"]
  }
});
const {
  joinGameRoom,
  gettingReady,
  newQuestion,
  startGame,
  submitAnswer,
  finalResult,
  disconnectPlayer,
  checkGameRoom
} = require('./utils/socket/onRequest')(io);

const {
  createGameRoom,
  disconnectAdmin
} = require('./utils/socket/onAdminRequest')(io);

const onConnection = (socket)=>{

  socket.on('createRoom',createGameRoom);

  socket.on('join',joinGameRoom);

  socket.on('getting_ready',gettingReady);
  socket.on('start_game',startGame);
  socket.on('new_question',newQuestion);
  socket.on('submit_answer',submitAnswer);
  socket.on('final_result',finalResult);
  socket.on('checkJoin',checkGameRoom);
  socket.on('disconnect',disconnectPlayer);
  socket.on('disconnect',disconnectAdmin);
}

io.on('connection',onConnection);

server.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
})
