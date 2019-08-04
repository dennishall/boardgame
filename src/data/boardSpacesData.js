var boardSpacesData = [
  {
    type: 'go',
    name: 'GO',
  },
  {
    type: 'property',
    name: 'Mediter-ranean Avenue',
    group: 'purple',
    price: 60,
    housePrice: 50,
    rents: [
      2,
      10,
      30,
      90,
      160,
      250,
    ]
  },
  {
    type: 'community chest',
  },
  {
    type: 'property',
    name: 'Baltic Avenue',
    group: 'purple',
    price: 60,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      180,
      320,
      450,
    ]
  },
  {
    type: 'income tax',
  },
  {
    type: 'property',
    name: 'Reading Railroad',
    group: 'railroad',
    price: 200,
    rents: [
      25,
      50,
      100,
      200,
    ]
  },
  {
    type: 'property',
    name: 'Oriental Avenue',
    group: 'lightblue',
    price: 100,
    housePrice: 50,
    rents: [
      6,
      30,
      90,
      270,
      400,
      550,
    ]
  },
  {
    type: 'chance',
  },
  {
    type: 'property',
    name: 'Vermont Avenue',
    group: 'lightblue',
    price: 100,
    housePrice: 50,
    rents: [
      6,
      30,
      90,
      270,
      400,
      550,
    ]
  },
  {
    type: 'property',
    name: 'Connecticut Avenue',
    group: 'lightblue',
    price: 100,
    housePrice: 50,
    rents: [
      8,
      40,
      100,
      300,
      450,
      600,
    ]
  },
  {
    type: 'jail',
    name: 'Jail',
  },
  {
    type: 'property',
    name: 'St. Charles Place',
    group: 'MediumVioletRed',
    price: 140,
    housePrice: 100,
    rents: [
      10,
      50,
      150,
      450,
      625,
      750,
    ]
  },
  {
    type: 'property',
    name: 'Electric Company',
    group: 'utility',
    price: 150,
  },
  {
    type: 'property',
    name: 'States Avenue',
    group: 'MediumVioletRed',
    price: 140,
    housePrice: 100,
    rents: [
      10,
      50,
      150,
      450,
      625,
      750,
    ]
  },
  {
    type: 'property',
    name: 'Virginia Avenue',
    group: 'MediumVioletRed',
    price: 160,
    housePrice: 100,
    rents: [
      12,
      60,
      180,
      500,
      700,
      900,
    ]
  },
  {
    type: 'property',
    name: 'Pennsylvania Railroad',
    group: 'railroad',
    price: 200,
    rents: [
      25,
      50,
      100,
      200,
    ]
  },
  {
    type: 'property',
    name: 'St. James Place',
    group: 'orange',
    price: 180,
    housePrice: 100,
    rents: [
      14,
      70,
      200,
      550,
      750,
      950,
    ]
  },
  {
    type: 'community chest',
  },
  {
    type: 'property',
    name: 'Tennessee Avenue',
    group: 'orange',
    price: 180,
    housePrice: 100,
    rents: [
      14,
      70,
      200,
      550,
      750,
      950,
    ]
  },
  {
    type: 'property',
    name: 'New York Avenue',
    group: 'orange',
    price: 200,
    housePrice: 100,
    rents: [
      16,
      80,
      220,
      600,
      800,
      1000,
    ]
  },
  {
    type: 'free parking',
  },
  {
    type: 'property',
    name: 'Kentucky Avenue',
    group: 'red',
    price: 220,
    housePrice: 150,
    rents: [
      18,
      90,
      250,
      700,
      875,
      1050,
    ]
  },
  {
    type: "chance",
  },
  {
    type: 'property',
    name: 'Indiana Avenue',
    group: 'red',
    price: 220,
    housePrice: 150,
    rents: [
      18,
      90,
      250,
      700,
      875,
      1050,
    ]
  },
  {
    type: 'property',
    name: 'Illinois Avenue',
    group: 'red',
    price: 240,
    housePrice: 150,
    rents: [
      20,
      100,
      300,
      750,
      925,
      1100,
    ]
  },
  {
    type: 'property',
    name: 'B & O Railroad',
    group: 'railroad',
    price: 200,
    rents: [
      25,
      50,
      100,
      200,
    ]
  },
  {
    type: 'property',
    name: 'Atlantic Avenue',
    group: 'yellow',
    price: 260,
    housePrice: 150,
    rents: [
      22,
      110,
      330,
      800,
      975,
      1150,
    ]
  },
  {
    type: 'property',
    name: 'Ventnor Avenue',
    group: 'yellow',
    price: 260,
    housePrice: 150,
    rents: [
      22,
      110,
      330,
      800,
      975,
      1150,
    ]
  },
  {
    type: 'property',
    name: 'Water Works',
    group: 'utility',
    price: 150,
  },
  {
    type: 'property',
    name: 'Marvin Gardens',
    group: 'yellow',
    price: 280,
    housePrice: 150,
    rents: [
      24,
      120,
      360,
      850,
      1025,
      1200,
    ]
  },
  {
    type: 'go to jail',
  },
  {
    type: 'property',
    name: 'Pacific Avenue',
    group: 'green',
    price: 300,
    housePrice: 200,
    rents: [
      26,
      130,
      390,
      900,
      1100,
      1275,
    ]
  },
  {
    type: 'property',
    name: 'North Carolina Avenue',
    group: 'green',
    price: 300,
    housePrice: 200,
    rents: [
      26,
      130,
      390,
      900,
      1100,
      1275,
    ]
  },
  {
    type: "community chest",
  },
  {
    type: 'property',
    name: 'Pennsylvania Avenue',
    group: 'green',
    price: 320,
    housePrice: 200,
    rents: [
      28,
      150,
      450,
      1000,
      1200,
      1400,
    ]
  },
  {
    type: 'property',
    name: 'Shortline Railroad',
    group: 'railroad',
    price: 200,
    rents: [
      25,
      50,
      100,
      200,
    ]
  },
  {
    type: "chance",
  },
  {
    type: 'property',
    name: 'Park Place',
    group: 'darkblue',
    price: 350,
    housePrice: 200,
    rents: [
      35,
      175,
      500,
      1100,
      1300,
      1500,
    ]
  },
  {
    type: 'luxury tax',
  },
  {
    type: 'property',
    name: 'Boardwalk',
    group: 'darkblue',
    price: 400,
    housePrice: 200,
    rents: [
      50,
      200,
      600,
      1400,
      1700,
      2000,
    ]
  },
];

export default boardSpacesData;
