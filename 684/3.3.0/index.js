var seneca = require('seneca')();
var async = require('async');

seneca.add('role:test,cmd:add', (msg, reply) => {
  reply(null, {answer: (msg.a + msg.b)})
})

async.auto({
    addOne: (done) => seneca.act({role: 'test', cmd: 'add', a: 1, b: 2}, done),
}, (err, data) => {
    console.log(data.addOne);
})
