const { createClient, defaultVersion } = require('dofus-protocol')
const fight = require('./src/plugins/fight')
const social = require('./src/plugins/social')
const account = require('./src/plugins/account')
const item = require('./src/plugins/item')
const exchange = require('./src/plugins/exchange')
const job = require('./src/plugins/job')
const movement = require('./src/plugins/movement')
const EventEmitter = require('events').EventEmitter

class Bot extends EventEmitter {
  constructor () {
    super()
    this._client = null
    this.data = {}
  }

  async connect (options) {
    this._client = await createClient(options)
    this._client.on('connect', () => {
      this.emit('connect')
    })
    this._client.on('error', (err) => {
      this.emit('error', err)
    })
    this._client.on('end', () => {
      this.emit('end')
    })
    this.loginToAccount = this._client.loginToAccount
    this.loginToServer = this._client.loginToServer
    this.pickCharacter = this._client.pickCharacter
  }

  end () {
    this._client.end()
  }
}

async function createBot (options) {
  const bot = new Bot()

  const p = bot.connect(options)
  fight(bot, options)
  social(bot, options)
  account(bot, options)
  item(bot, options)
  exchange(bot, options)
  job(bot, options)
  movement(bot, options)

  await p

  return bot
}

module.exports = { createBot, defaultVersion }
