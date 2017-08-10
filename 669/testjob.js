const defaultConnectionOptions = {
  port: 280166
}

const defaultQueueOption = {
  name: 'SendEmail'
}

module.exports = function testjob (options) {
  let Seneca = this
  options = this.util.deepextend({
    queueOption: defaultQueueOption,
    connctionOption: defaultConnectionOptions
  }, options)

  this.add('role:jobtest,cmd:create', async function emailSend (msg, response) {
    let {err, result} = await createJobQueue(msg)
    if (err) {
      response(err)
    } else {
      response(null, result)
    }
  })

  let createJobQueue = async function (qdata) {
    try {
      // check port number range
      checkPortNumber(options.connctionOption.port)
      savedJobs = {"res":"this is response"}
      return {err: null, result: savedJobs}
    } catch (err1) {
      return {err: err1}
    }
  }

  let checkPortNumber = function (port) {
    if (port > 65535) {
      throw new Error('port number should be less thne 65536')
    }
  }
}
