const { createBot, defaultVersion } = require('..')

var ArgumentParser = require('argparse').ArgumentParser
var parser = new ArgumentParser({
  version: '1.4.1',
  addHelp: true,
  description: 'Simple bot'
})
parser.addArgument([ '-u', '--username' ], { required: true })
parser.addArgument([ '-p', '--password' ], { required: true })
parser.addArgument([ '-c', '--character' ], { required: true })
parser.addArgument([ '-s', '--server' ], { required: true })
parser.addArgument([ '-d', '--delay' ], { defaultValue: 0 }) // Only servers with anti hack system (i.e. officials) should use delay between packets

const { username, password, character, server, delay } = parser.parseArgs()

async function start () {
  // PORT 887 private serv // 443 dofus retro
  // IP '34.251.172.139' retro '190.115.26.126' priv
  const dev = true
  const port = dev ? 887 : 443
  const host = dev ? '190.115.26.126' : '34.251.172.139'
  let bot = await createBot({
    host,
    port,
    username,
    password,
    version: defaultVersion,
    delay })
  let feedDelay = 1000 * 60 * 60 * 24 // Once a day (lower it)
  bot.initItems()
  await bot.connectToGame(server, character)
  await bot.moveItem(2473, 7)
  // await bot.unequipItem(2473)

  /*
  while (true) {
    await bot.connectToGame(character)
    await bot.feedPets([7703], [2322])
    await bot.disconnect()
    setTimeout(() => {}, feedDelay * (1 + Math.random() / 10)) // delay * 1.[Random(0, 10)]
  }
  */
}

start()
