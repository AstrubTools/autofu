// Ranking from highest level to lowest level
const { task } = require('../utils/utils')
const { onAccountSelectCharacter } = require('dofus-protocol').finalPacketParser
const dofusData = require('node-dofus-data')('official_130')

function inject (bot) {
  bot.initItems = () => {
    bot._client.on('ACCOUNT_SELECT_CHARACTER', data => {
      bot.data.items = onAccountSelectCharacter(data.data).items
      console.log(`My items ${JSON.stringify(bot.data.items)}`)
    })
  }

  // Goes to bank, drop everything non needed
  bot.bank = async (parameters) => {
  }

  bot.feedPets = (pets, foods) => {
    return task(async () => {
      for (let i = 0; i < pets.length; i++) {
        await bot.feedPet(pets[i], foods[i])
      }
    }, bot, '', 0, 1)
  }

  bot.feedPet = async (pet, food) => {
    return task(() => {
      bot.moveItem(pet, dofusData.itemPositions.pet) // TODO: dofusData.itemPositions
      // TODO: either find magically proper food for this pet
      bot.moveItem(food, dofusData.itemPositions.pet)
    }, bot, 'ACCOUNT_STATS', 0, 1) // TODO: fix that callback, is there a callback?
  }

  // Equip an item, slot is only useful for rings i guess ?
  // Basically should be a moveItem but detecting where the item has to go ?
  bot.equipItem = (itemId) => {
    return task(() => {
      bot._client.write('OBJECT_MOVEMENT', {
        itemId: itemId,
        position: '', // TODO: find proper position
        quantity: ''
      })
    }, bot, 'OBJECT_MOVEMENT', 4000, 5)
  }

  bot.unequipItem = (itemType) => {
    return bot.moveItem(itemType, '-1')
  }

  bot.destroyItem = async (item) => {
  }

  bot.dropItem = async (item) => {
  }

  // Position -1 to just unequip
  bot.moveItem = (itemType, position, quantity) => {
    return task(() => {
      let foundItem = bot.data.items.find(i => i.itemType === itemType)
      if (!foundItem) throw Error(`Couldn't find ${itemType}`)
      if (foundItem.position === position) throw Error(`${itemType} is already in position ${position}`)
      console.log(`foundItem`, foundItem)
      bot._client.write('OBJECT_MOVEMENT', {
        data: `${foundItem.itemId}|${position}${quantity !== undefined ? '|' + quantity : ''}`
      })
    }, bot, 'OBJECT_MOVEMENT', 4000, 5)
  }

  // E.g bread ? If cell isn't defined on self
  bot.useItem = async (item, cell) => {
  }

  // Brute force house code <3
  bot.hackHouse = async (house) => {
  }
}

module.exports = inject
