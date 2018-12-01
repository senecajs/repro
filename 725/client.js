'use strict';

const seneca = require('seneca')({
  log: 'none',
  test: false,
});

seneca.client({
  type: 'tcp',
  port: 12345,
  host: '0.0.0.0',
  pin: 'role:foo'
});

let reqNum = 0;

setInterval(() => {
  const currentReqNum = reqNum++;
  console.log('Sent request ' + currentReqNum + '.');
  seneca.act({
    role: 'foo',
    cmd: 'bar',
    n: currentReqNum,
  }, function (err, res) {
    console.log(`Received response ${res.n}.`);
  });
}, 1500);
