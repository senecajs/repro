var Seneca = require('seneca')

var s0 = Seneca({id$:'s0'}).test('print')
var c0 = Seneca({id$:'c0'}).test('print')

s0
  .add('a:1', function plus100 (msg, reply) {
      reply({x: 100 + msg.x})
    })
  .listen()
  .ready(function() {
    c0
      .client({pin:'a:1'})
      .ready(function () {
        this
          .add('a:1', function plus2 (msg, reply) {
            msg.x += 2
            this.prior(msg, reply)
          })
          .act('a:1,x:1')
      })
  })

