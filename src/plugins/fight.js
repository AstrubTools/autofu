// Ranking from highest level to lowest level
const task = require('../utils/utils')

// This can be a mix of job / fight
function inject (bot) {
  bot.data.isFighting = false
  bot.farmResources = async (resources, parameters) => {
  }

  bot.farmZones = async (zones, parameters) => {
  }

  bot.farmMobs = async (mobs, parameters) => {
  }

  bot.farmDungeon = async (dungeon, parameters) => {
  }

  bot.farmMap = async (coordinates, parameters) => {
  }

  // Launch and win a fight, TODO: param capture on off ?
  bot.killGroup = async (group, parameters) => {
  }

  // Try to kill a target
  bot.killTarget = async (target, parameters) => {
  }

  // Heal team
  bot.healTeam = async (parameters) => {
  }

  // Heal target
  bot.healTarget = async (target, parameters) => {
  }

  // Buff team, example: give AP, maybe some param: x player priority ...
  bot.buffTeam = async (parameters) => {
  }

  // Buff target, example: give AP, maybe some param: x player priority ...
  bot.buffTarget = async (target, parameters) => {
  }

  // Debuff target
  bot.debuffTarget = async (target) => {
  }

  bot.slowTarget = async (target) => {
  }

  bot.pushTarget = async (target) => {
  }

  // Use spell on cell
  bot.useSpell = async (spell, cell) => {
    return task(() => {
      bot.write('GAME_ACTION', {
        data: `300${spell};${cell}`
      })
    }, bot, 'GAME_ACTION', 4000, 5)
  }

  // In fight, move to cell, later improvement would be "avoid traps, glyphes, taking damage ..."
  bot.fightMove = async (cell, parameters) => {
  }

  bot.on('SPELL', (data) => {
    bot.data.skills = data.data.filter(e => e !== '').map(e => { return { skillId: e[0], skillLevel: e[1], unknown: e[2] } })
  })
}

module.exports = inject
