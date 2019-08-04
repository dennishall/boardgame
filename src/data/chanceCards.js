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
      // todo: if someone else owns this space, make player pay rent.
    }
  },
  {
    title: "Advance to St. Charles Place – If you pass Go, collect $200",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'St. Charles Place'})
      // todo: if someone else owns this space, make player pay rent.
    }
  },
  {
    title: "Advance token to nearest Utility. If unowned, you may buy it from the Bank. If owned, throw dice and pay owner a total ten times the amount thrown.",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {group: 'utility'})
      // todo : we need a way to find the owner of a property, if any.
      // todo : if owned, "roll dice" & pay owner 10x dice value
    }
  },
  {
    title: "Advance token to the nearest Railroad and pay owner twice the rental to which she/he is otherwise entitled. If Railroad is unowned, you may buy it from the Bank.",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {group: 'railroad'})
      // todo : we need a way to find the owner of a property, if any.
      // todo : if owned, pay owner 2x rent
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
      // todo
    }
  },
  {
    title: "Go Back 3 Spaces",
    action: function (player) {
      player.spaceIndex -= 3;
      // todo: if someone else owns this space, make player pay rent.
    }
  },
  {
    title: "Go to Jail – Go directly to Jail – Do not pass Go, do not collect $200",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'Jail'}, true)
      player.isInJail = true
      player.numTurnsInJail = 0
      // done
    }
  },
  {
    title: "Make general repairs on all your property – For each house pay $25–For each hotel $100",
    action: function (player) {
      // todo
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
      // todo: if someone else owns this space, make player pay rent.
    }
  },
  {
    title: "Take a walk on the Boardwalk–Advance token to Boardwalk",
    action: function (player) {
      advancePlayerToSpace.call(this, player, {name: 'Boardwalk'})
      // todo: if someone else owns this space, make player pay rent.
    }
  },
  {
    title: "You have been elected Chairman of the Board – Pay each player $50",
    action: function (player, players) {
      // todo
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
