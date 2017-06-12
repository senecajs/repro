var seneca = require('seneca')({log:'silent'})
      seneca.add('role:service2,cmd:status',(msg,done)=>{
        setTimeout(function(){
           	 done({status:'running'})
        },500)
      })
      seneca.add('role:service2,cmd:error',(msg,done)=>{
         throw new Error('I am goint to break things')
      })
      seneca.use('mesh',{
            listen:[{pin:'role:service2'}],
            auto: true,
            bases:['127.0.0.1:39999'],
            host:'127.0.0.1'
       })
      seneca.ready(()=>{
        console.log('service 2 seneca is ready')
      })
