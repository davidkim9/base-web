const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

const path = require('path');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);

// webpack hmr
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }),
);
app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('public'));
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../www/index.html')));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
    console.log('message:', msg);
    socket.emit('chat message', 'pong');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
