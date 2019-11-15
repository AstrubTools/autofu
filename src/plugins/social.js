// Ranking from highest level to lowest level
function inject (bot) {
// Humanize the bot by using DialogFlow for example
  bot.chatBot = async (parameters) => {
  }

  // Anti ban, but risky imo, like GET to talktotransformer.com with a base sentence and gg wp
  bot.sayRandom = async (parameters) => {
  }

  bot.addFriend = async (target) => {
  }

  bot.removeFriend = async (target) => {
  }

  bot.blockTarget = async (target) => {
  }

  // Say in channel, if target is defined it will be a whispers
  bot.say = (target, message) => {
    bot.write('BASIC_MESSAGE', {
      target: target !== undefined ? target : '*', // Default channel (general)
      message: `${message}|`
    })
  }

  // Party invite
  bot.invite = async (target) => {
  }

  // Party kick
  bot.kick = async (target) => {
  }

  // Party follow (not named "follow" because it might be taken by movement) when you click on follow in group you know
  bot.partyTollow = async (target) => {
  }
}

module.exports = inject
