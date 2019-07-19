import React from 'react';

import Space from './Space';

import './App.scss';


var boardSpaces = [
  {
    type: 'go',
  },
  {
    type: 'property',
    name: 'Mediterranean Avenue',
    group: 'purple',
    price: 60,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
      200,
      300,
      400,
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
    group: 'light blue',
    price: 100,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'chance',
  },
  {
    type: 'property',
    name: 'Vermont Avenue',
    group: 'light blue',
    price: 100,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'Connecticut Avenue',
    group: 'light blue',
    price: 100,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'jail',
  },
  {
    type: 'property',
    name: 'St. Charles Place',
    group: 'magenta',
    price: 140,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    group: 'magenta',
    price: 140,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'Virginia Avenue',
    group: 'magenta',
    price: 160,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'New York Avenue',
    group: 'orange',
    price: 200,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'Illinois Avenue',
    group: 'red',
    price: 240,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'Ventnor Avenue',
    group: 'yellow',
    price: 260,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'property',
    name: 'North Carolina Avenue',
    group: 'green',
    price: 300,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
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
    group: 'dark blue',
    price: 350,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
  {
    type: 'luxury tax',
  },
  {
    type: 'property',
    name: 'Boardwalk',
    group: 'dark blue',
    price: 400,
    housePrice: 50,
    rents: [
      4,
      20,
      60,
      200,
      300,
      400,
    ]
  },
];

function didPlayerLandOnOrPassGo () {
  // if previous boardSpaceIndex > 0 && current boardSpaceIndex >= 0
}

function App() {
  return (
    <div className="App">
      <div className="edge edge--bottom">
        {boardSpaces.map((space, i) => (
          i < 10 ?
            <Space
              space={space}
            >
            </Space>
            : ''
        ))}
        <div className="edge edge--left">
          {boardSpaces.map((space, i) => (
            i > 9 && i < 20 ?
              <Space
                space={space}
              >
              </Space>
              : ''
          ))}
          <div className="edge edge--top">
            {boardSpaces.map((space, i) => (
              i > 19 && i < 30 ?
                <Space
                  space={space}
                >
                </Space>
                : ''
            ))}
            <div className="edge edge--right">
              {boardSpaces.map((space, i) => (
                i > 29 ?
                  <Space
                    space={space}
                  >
                  </Space>
                  : ''
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
