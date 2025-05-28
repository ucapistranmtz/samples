const { EventEmitter } = require('events');

const emitter = new EventEmitter();

emitter.on('log', message => {
  console.log('log called', message);
});

emitter.emit('log', 'hello');
