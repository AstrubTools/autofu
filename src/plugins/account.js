// Ranking from highest level to lowest level
function inject (bot) {
// Full login to game sequence
  bot.connectToGame = async (server, character) => {
    await bot.loginToAccount()
    await bot.loginToServer(server)
    await bot.pickCharacter(character)
  }

  // Disconnect from game and lobby
  bot.disconnect = async () => {
    bot._client.disconnect()
  }

  // Disconnect from game, login with another character to game
  bot.changeCharacter = async (name, server) => {
  }

  // Create new character
  bot.createCharacter = async (name, server, classs, sex, colors) => { // class is taken name
  }

  // Delete character
  bot.deleteCharacter = async (name, server) => {
  }
}

module.exports = inject
