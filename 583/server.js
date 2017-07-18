'use strict';

const seneca = require('seneca')();

seneca.add({
  role: 'foo',
  cmd: 'bar'
}, (args, cb) => {
  console.log('Received request', args.id$);

  setTimeout(() => {
    console.log('Responding to request', args.id$);

    cb(null, { name: args.name });
  }, 2000); // Notice this is higher than the interval in the client
})

seneca.listen({
  type: 'http',
  port: 12345,
  host: '0.0.0.0'
});

process.once('SIGINT', () => {
  console.log('Received SIGINT');

  // The server will keep listening and serving requests. The callback will be
  // called once the client stops.
  seneca.close(() => {
    console.log('Seneca closed');
  });
});
