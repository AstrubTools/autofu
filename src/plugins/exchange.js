const task = require('../utils/utils')
const { onExchangeShop, log } = require('dofus-protocol')

function inject (bot) {
  bot.data.shop = {}
  bot.data.shop.items = []

  bot.on('EXCHANGE_TYPE_SHOP', (data) => {
    let shopData = onExchangeShop(data.data)
    let categoryIndex = bot.data.shop.items.findIndex(e => e.category === shopData.category)
    if ('itemsId' in shopData) {
      // If we already have this category, update it, else push into the array
      if (categoryIndex !== -1) {
        bot.data.shop.items[categoryIndex] = shopData
      } else {
        bot.data.shop.items.push(shopData)
      }
    } else if ('items' in shopData) {
      // Shouldn't happen cuz we have to receive IDS before arriving to this step
      if (categoryIndex !== -1) { // Add items data under the item category
        bot.data.shop.items[categoryIndex].data = shopData
      }
    }
  })
  // Ranking from highest level to lowest level
  // For each category of item in the shop, for each items PUT to API
  /*
  bot.shopScrap = async (shops) => {
    return new Promise((resolve, reject) => {
      if (!shops) shops = dofusData.shops
      while (true) {
        bot.connect()
        bot.moveToLocation(dofusData.locations.bonta)
        bot.disconnect()
        shops.forEach(async s => { // TODO: random loop instead for safety
          Promise.all([bot.moveToCoordinates(s.coordinates),
            bot.openShop(s.id),
            bot.getShopItems(s.id),
            bot.getShopItemPrices(s.id)])
        })
      }
    })
  }
  */

  // Find right shop and get item price
  bot.getItemsprice = async (items) => {
  }

  // Find right shop and buy items
  bot.buyItems = async (items) => {
  }

  // Sell items at shop at prices, if prices is undefined, sell to npc
  bot.sellItems = async (items, prices) => {
  }

  // Try to give items to player via trade
  bot.giveItems = async (items, player) => {
  }

  // Try to get items from player via trade
  bot.getItems = async (player) => {
  }

  bot.openShop = (shop) => {
    return task(() => {
      bot.write('EXCHANGE_REQUEST', {
        exchangeType: dofusData.exchangeType.shop,
        targetAndCell: '-1'
      })
    }, bot, 'EXCHANGE_CREATE', 4000, 5)
  }

  // items list
  bot.getShopItems = async (shop) => {
    return task(() => {
      bot.write('EXCHANGE_SHOP_TYPE', {
        type: dofusData.exchangeType.shop
      })
    }, bot, 'EXCHANGE_SHOP_TYPE', 4000, 5)
      .then(data => { // le shop nous a balancé les info, qui seront parsé dans listentoinfo ...
        log(bot.data.shop, bot.id, '')
      })
  }

  // when then u click on item
  bot.getShopItemPrices = async (shop) => {
  }
}

module.exports = inject
