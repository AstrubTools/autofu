const { once } = require('once-promise')

// Common structure for every tasks
// will execute a function and retry until success
// will push logs to the API
function task (fn, client, successCallback, t, stopAfter) {
  return new Promise((resolve, reject) => {
    log(`Starting a task`, client.sessionId, '')
    let interval
    once(client, successCallback).then(data => {
      clearInterval(interval)
      log(`Successfully finished task`, client.sessionId, '')
      resolve(data)
    })
    fn()
    let attempt = 1
    interval = setInterval(() => {
      ++attempt
      if (attempt > stopAfter) {
        clearInterval(interval)
        let err = `Failed to execute after ${attempt} attempt, aborting`
        log(err, client.sessionId, '')
        reject(Error(err))
      }
      fn()
    }, t)
  })
}
// POST a log under sessionid
function log (message, sessionId, logLevel, useApi) {
  if (useApi) {
    // fetch(`apiurl/logs/${sessionId}`, { message, logLevel, Date.now() })
  } else {
    console.log(`${message}`)
  }
}

module.exports = { task, log }
