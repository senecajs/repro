'use strict';

const seneca = require('seneca')();

seneca.client({
  type: 'http',
  port: 12345,
  host: '0.0.0.0',
  pin: 'role:foo'
});

let name = 0;

setInterval(() => {
  seneca.act({
    role: 'foo',
    cmd: 'bar',
    name: name++,
  }, function (err, res) {
    console.log(Date.now(), err, res);
  });
}, 1500);
