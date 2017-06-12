var seneca = require('seneca')({log:'silent'})
    seneca.add('role:service1,cmd:status',(msg,done)=>{
      setTimeout(function(){
         	 done({status:'running'})
      },500)
    })
    seneca.add('role:service1,cmd:error',(msg,done)=>{
       throw new Error('I am goint to break things')
    })
    seneca.use('mesh',{
          isbase:true,
          listen:[{pin:'role:service1'}],
          port:39999,
          bases:['127.0.0.1:39999'],
          host:'127.0.0.1'
     })
    seneca.ready(()=>{
      console.log('service 1 seneca is ready')
      setTimeout(function(){	
         	seneca.act({role:'service2',cmd:'status'},(err,data)=>{
           		console.log('status got called',err,data)
        	})
        	seneca.act({role:'service2',cmd:'error'},(err,data)=>{
         		console.log('error was thrown')
         	})
      },10000)
    })
