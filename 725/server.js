'use strict';

const seneca = require('seneca')({
    close_delay: 5000,
    log: 'none',
    test: false,
  }
);

seneca.add({
  role: 'foo',
  cmd: 'bar'
}, (args, cb) => {
  console.log(`Received request ${args.n}`);

  setTimeout(() => {
    console.log(`Responding to request ${args.n}.`);

    cb(null, { n: args.n });
  }, 3000); // Notice this is higher than the interval in the client
})

seneca.listen({
  type: 'tcp',
  port: 12345,
  host: '0.0.0.0'
});


process.once('SIGINT', () => {
  console.log('Received SIGINT');

  // The server will keep listening and serving requests. The callback will be
  // called once the client stops.
  seneca.close(() => {
    console.log('Seneca closed callback.');
  });
});
