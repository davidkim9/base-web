const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');

const app = express();

const isDevelopment = process.env.NODE_ENV !== "production";

if(isDevelopment === true) {
  const compiler = webpack(webpackConfig);
  // webpack hmr
  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(require('webpack-hot-middleware')(compiler));
}

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../www/index.html')));

let httpServer = http.createServer(app);
var io = socketio(httpServer);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message:', msg);
    socket.emit('chat message', 'pong');
  });
  socket.on('disconnect', (reason) => {
    console.log('a user disconnected', reason);
  });
});

httpServer.listen(3000, function(){
  console.log('listening on *:3000');
});
