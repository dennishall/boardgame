import advancePlayerToSpace from '../utils/advancePlayerToSpace'

// todo: if subtracting money or paying rent and the player has insufficient funds,
// ...present the player with the option to mortgage or sell properties.

var chanceCards = [
  {
    title: "Advance to Go (Collect $200)",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'GO'})
    }
  },
  {
    title: "Advance to Illinois Ave — If you pass Go, collect $200",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'Illinois Avenue'})
    }
  },
  {
    title: "Advance to St. Charles Place – If you pass Go, collect $200",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'St. Charles Place'})
    }
  },
  {
    title: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {group: 'utility'}, 10)
    }
  },
  {
    title: "Advance token to the nearest Railroad and pay owner twice the rental to which she/he is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {group: 'railroad'}, 2)
    }
  },
  {
    title: "Bank pays you dividend of $50",
    action: function (player) {
      player.money += 50;
      // done.
    }
  },
  {
    title: "Get Out of Jail Free",
    action: function (player) {
      player.numGetOutOfJailFreeCards++
    }
  },
  {
    title: "Go Back 3 Spaces",
    action: function (player) {
      player.spaceIndex -= 4;
      advancePlayerToSpace.call(this, player, player.spaceIndex + 1)
    }
  },
  {
    title: "Go to Jail – Go directly to Jail – Do not pass Go, do not collect $200",
    action: function (player) {
      player.spaceIndex = 10
      player.isInJail = true
      player.numTurnsInJail = 0
      // done
    }
  },
  {
    title: "Make general repairs on all your property – For each house pay $25–For each hotel $100",
    action: function (player) {
      let amountOwed = 0
      player.properties.forEach(property => {
        amountOwed += property.numHouses === 5 ? 100 : property.numHouses * 25
      })
      player.money -= amountOwed
    }
  },
  {
    title: "Pay poor tax of $15",
    action: function (player) {
      player.money -= 15;
      // done.
    }
  },
  {
    title: "Take a trip to Reading Railroad – If you pass Go, collect $200",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'Reading Railroad'})
    }
  },
  {
    title: "Take a walk on the Boardwalk–Advance token to Boardwalk",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'Boardwalk'})
    }
  },
  {
    title: "You have been elected Chairman of the Board – Pay each player $50",
    action: function (player, players) {
      // todo: first determine if the player has enough money
      // let amountOwed = 50 * (players.length - 1)
      players.forEach(otherPlayer => {
        if (player.id !== otherPlayer.id) {
          player.money -= 50
          otherPlayer.money += 50
        }
      })
    }
  },
  {
    title: "Your building and loan matures — Collect $150",
    action: function (player) {
      player.money += 150;
      // done.
    }
  },
  {
    title: "You have won a crossword competition — Collect $100",
    action: function (player) {
      player.money += 100;
      // done.
    }
  },
];

export default chanceCards;
