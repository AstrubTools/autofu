const { createBot } = require('..')
const { defaultVersion } = require('..')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

var ArgumentParser = require('argparse').ArgumentParser
var parser = new ArgumentParser({
  version: '1.4.1',
  addHelp: true,
  description: 'Simple bot'
})
parser.addArgument([ '-u', '--username' ], { required: true })
parser.addArgument([ '-p', '--password' ], { required: true })
parser.addArgument([ '-c', '--character' ], { required: true })
parser.addArgument([ '-d', '--delay' ], { defaultValue: 0 }) // Only servers with anti hack system (i.e. officials) should use delay between packets

const { username, password, character, delay } = parser.parseArgs()

async function start () {
  // PORT 887 private serv // 443 dofus retro
  // IP '34.251.172.139' retro '190.115.26.126' priv
  const dev = true
  const port = dev ? 887 : 443
  const host = dev ? '190.115.26.126' : '34.251.172.139'
  let bot = await createBot({ 
    host,
    port,
    account: username,
    password,
    version: defaultVersion,
    delay })
  // connect to websocket
  // supposed somehow it has been docker deployed
  // fetch(`api/session`, { accountId }) // POST create a new session
  // fetch(`api/tasks/${sessionId}`) // get my tasks
  // while (true) { tasks ... }
  await bot.connect(character)

  app.use(bodyParser.json()); // for parsing application/json
  // app.use(bodyParser.urlencoded({extended: false})); // for parsing application/x-www-form-urlencoded

  // For debugging toServer
  app.post('/', (req, res) => {
    console.log(req.body) // req data
    res.send('POST request!!!')
    // bot.write(req.body)
  })

  let postPort = 8001
  app.listen(postPort, () => {
    console.log('Server is up and running on port number ' + postPort)
  })
}

start()
