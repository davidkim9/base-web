import '../style/main.scss';

console.log('Hello World');

if (module.hot) {
  console.log('module is hot');
  module.hot.accept('../style/main.scss', function() {
    console.log('hot module reload');
  });
}

import io from 'socket.io-client';

var socket = io();

socket.emit('chat message', 'ping');

socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
});