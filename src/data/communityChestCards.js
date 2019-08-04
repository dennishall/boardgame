
// todo: if subtracting money or paying rent and the player has insufficient funds,
// present the player with the option to mortgage or sell properties.

var communityChestCards = [
  {
    title: "Advance to Go (Collect $200)",
    action: function (player) {
      player.spaceIndex = 0;
      player.money += 200;
    }
  },
  {
    title: "Bank error in your favor — Collect $200",
    action: function (player) {
      player.money += 200;
      // done
    }
  },
  {
    title: "Doctor's fee — Pay $50",
    action: function (player) {
      player.money -= 50;
      // done
    }
  },
  {
    title: "From sale of stock you get $50",
    action: function (player) {
      player.money += 50;
      // done
    }
  },
  {
    title: "Get Out of Jail Free",
    action: function (player) {
      // todo
    }
  },
  {
    title: "Go to Jail – Go directly to jail – Do not pass Go – Do not collect $200",
    action: function (player) {
      // todo
    }
  },
  {
    title: "Grand Opera Night — Collect $50 from every player for opening night seats",
    action: function (player, players) {
      // todo
    }
  },
  {
    title: "Holiday Fund matures — Receive $100",
    action: function (player) {
      player.money += 100;
      // done
    }
  },
  {
    title: "Income tax refund – Collect $20",
    action: function (player) {
      player.money += 20;
      // done
    }
  },
  {
    title: "It is your birthday — Collect $10",
    action: function (player) {
      player.money += 10;
      // done
    }
  },
  {
    title: "Life insurance matures – Collect $100",
    action: function (player) {
      player.money += 100;
      // done
    }
  },
  {
    title: "Pay hospital fees of $100",
    action: function (player) {
      player.money -= 100;
      // done
    }
  },
  {
    title: "Pay school fees of $150",
    action: function (player) {
      player.money -= 150;
      // done
    }
  },
  {
    title: "Receive $25 consultancy fee",
    action: function (player) {
      player.money += 25;
      // done
    }
  },
  {
    title: "You are assessed for street repairs – $40 per house – $115 per hotel",
    action: function (player) {
      // todo
    }
  },
  {
    title: "You have won second prize in a beauty contest – Collect $10",
    action: function (player) {
      player.money += 10;
      // done
    }
  },
  {
    title: "You inherit $100",
    action: function (player) {
      player.money += 100;
      // done
    }
  },
];

export default communityChestCards;
