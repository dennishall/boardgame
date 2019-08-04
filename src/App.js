import React, { Component } from 'react'
import Space from './Space'
import GetPlayerInfo from './components/GetPlayerInfo'
import boardSpacesData from './data/boardSpacesData'
import gamePhases from './data/gamePhases'
import './App.scss'
import advancePlayerToSpace from './utils/advancePlayerToSpace'

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      gamePhase: gamePhases.PRE,
      numPlayers: 2,
      numTurnsTotal: 0,
      players: [
        {id: 0, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 1, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 2, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 3, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 4, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 5, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 6, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
        {id: 7, name: '', token: '', spaceIndex: 0, money: 1500, properties: [], numDoubles: 0, orbits: 0},
      ],
      indexOfWhoseTurnItIs: 0,
    }
    // self-bind all methods
    this.onChangeNumPlayers = this.onChangeNumPlayers.bind(this)
    this.onChangePlayerName = this.onChangePlayerName.bind(this)
    this.onChangePlayerToken = this.onChangePlayerToken.bind(this)
    this.onStartGame = this.onStartGame.bind(this)
    this.onEndTurn = this.onEndTurn.bind(this)
    this.simulateTurn = this.simulateTurn.bind(this)
  }

  onChangeNumPlayers (e) {
    this.setState({
      numPlayers: +e.target.value,
    })
  }

  onChangePlayerName (i, e) {
    let players = JSON.parse(JSON.stringify(this.state.players));
    players[i].name = e.target.value
    this.setState({
      players: players
    })
  }

  onChangePlayerToken (i, e) {
    let players = JSON.parse(JSON.stringify(this.state.players));
    let numPlayers = this.state.numPlayers
    players[i].token = e.target.value
    // handle collisions with 'spectator' players: unset spectator's token
    players.forEach(player => {
      if (player.id >= numPlayers && player.token === players[i].token) {
        player.token = ''
      }
    })
    this.setState({
      players: players
    })
  }

  onStartGame () {
    this.setState({
      gamePhase: gamePhases.REGULAR
    })
    this.simulateTurn();
  }

  onEndTurn () {
    let numTurns = this.state.numTurnsTotal;
    let indexOfWhoseTurnItIs = this.state.indexOfWhoseTurnItIs
    let players = JSON.parse(JSON.stringify(this.state.players));
    let player = players[indexOfWhoseTurnItIs]
    // turn is over, reset num doubles rolled back to zero
    player.numDoubles = 0
    this.setState({
      numTurnsTotal: ++numTurns,
      players: players,
      indexOfWhoseTurnItIs: ++indexOfWhoseTurnItIs % this.state.numPlayers,
    }, function () {
      setTimeout(this.simulateTurn.bind(this), 700);
    })
  }

  //////////////////////////////////////////
  // utility functions
  //////////////////////////////////////////

  indexOfOwner (space) {
    for (var i = 0; i < this.state.numPlayers; i++) {
      if (this.state.players[i].properties.some(property => property.name === space.name)) {
        return i
      }
    }
    return -1
  }

  buyProperty (player, space) {
    let property = JSON.parse(JSON.stringify(space))
    property.numHouses = 0
    player.money -= space.price
    player.properties.push(property)
    // sort the properties so they are in "board" order
    player.properties.sort((a, b) => {
      let aIndex = boardSpacesData.findIndex(s => s.name === a.name)
      let bIndex = boardSpacesData.findIndex(s => s.name === b.name)
      let aIsRail = /rail/.test(a.group)
      let aIsUtil = /util/.test(a.group)
      let bIsRail = /rail/.test(b.group)
      let bIsUtil = /util/.test(b.group)
      if(aIsRail && bIsUtil) return -1;
      if(aIsUtil && bIsRail) return 1;
      if(aIsRail || aIsUtil) return -1;
      if(bIsRail || bIsUtil) return 1;
      return aIndex < bIndex ? -1 : 1
    })
    console.log(player.token, 'bought her/his', player.properties.length, '\' property:', property.name, 'for', property.price, 'new balance', player.money)
  }

  payRent (player, owner) {
    // does the owner own all properties in the group?
    let space = boardSpacesData[player.spaceIndex]
    console.log('about to pay rent...', player.spaceIndex, JSON.stringify(space));
    let property = owner.properties.find(p => p.name === space.name)
    let rent;
    let numPropertiesOwnedInGroup = 0
    let ownerHasMonopoly = true
    for (let i = 0; i < boardSpacesData.length; i++) {
      let candidateSpace = boardSpacesData[i]
      // is this board space in the same group as the property?
      if (candidateSpace.group === property.group) {
        // and does the owner also own this one?
        if (owner.properties.find(p => p.name === candidateSpace.name)) {
          numPropertiesOwnedInGroup++
        } else {
          // the owner does not own this one, so the owner does not have a monopoly
          ownerHasMonopoly = false
        }
      }
    }
    // is it a railroad?
    if (property.group === 'railroad') {
      // then rent is based on number of railroads owned
      rent = property.rents[numPropertiesOwnedInGroup]
    }
    // is it a utility?
    else if (property.group === 'utility') {
      // then rent is based on number of utilites owned, AND THE ROLL OF THE DICE
      let dieValue1 = Math.ceil(Math.random() * 6)
      let dieValue2 = Math.ceil(Math.random() * 6)
      let diceValue = dieValue1 + dieValue2
      console.log('rolled dice: ', diceValue)
      rent = Math.round(diceValue * (numPropertiesOwnedInGroup === 2 ? 10 : 4))
    }
    else {
      // it's a regular property
      rent = property.rents[property.numHouses]
      if (property.numHouses === 0 && ownerHasMonopoly) {
        rent *= 2
      }
    }
    // todo - if player has insufficient funds.
    // for now, assume it's ok
    player.money -= rent
    owner.money += rent
    console.warn(player.token, 'payed', rent, 'rent to', owner.token, 'new balances: ', player.money, owner.money)
  }

  simulateTurn () {
    let players = JSON.parse(JSON.stringify(this.state.players))
    let player = players[this.state.indexOfWhoseTurnItIs]
    // roll dice
    let dieValue1 = Math.ceil(Math.random() * 6)
    let dieValue2 = Math.ceil(Math.random() * 6)
    let diceValue = dieValue1 + dieValue2
    let isDoubles = dieValue1 === dieValue2
    if (isDoubles) {
      player.numDoubles++;
      if (player.numDoubles === 3) {
        // todo - display message: "you rolled doubles three times in a row, you're now going straight to jail :("
        console.log(player.token, '!!!!!!!!!!!!!!! rolled doubles three times, went to jail')
        player.numDoubles = 0;
        advancePlayerToSpace(player, {name: 'Jail'}, true)
        this.setState({
          players: players
        }, this.onEndTurn)
        return
      }
    }
    console.log(player.token, 'rolled dice: ', diceValue)
    // move player
    let i = 0;
    function move () {
      if (++player.spaceIndex === boardSpacesData.length) {
        player.spaceIndex = 0
        player.money += 200
        player.orbits++
        console.log(player.token, 'landed on or passed GO and collected $200, now has', player.money)
      }
      console.log(player.token, 'advanced to', boardSpacesData[player.spaceIndex].name || boardSpacesData[player.spaceIndex].type, i + 1, diceValue)
      this.setState({
        players: players
      }, function () {
        // console.log(i, diceValue);
        if (++i < diceValue) {
          setTimeout(move.bind(this), 100)
          return
        }
        let space = boardSpacesData[player.spaceIndex]
        let indexOfOwner = this.indexOfOwner(space)
        if (space.type === 'property') {
          if (indexOfOwner >= 0) {
            // it's owned.  do you own it?
            if (indexOfOwner !== this.state.indexOfWhoseTurnItIs) {
              // nope, pay rent.
              this.payRent(player, players[indexOfOwner])
              this.setState({
                players: players
              })
            }
          } else {
            // it's unowned
            // for the sake of simulation, buy it if you have enough money
            if (player.money >= space.price) {
              this.buyProperty(player, space)
              this.setState({
                players: players
              })
            }
          }
        } else {
          // or get chance or community chest card, if it is one of those
          // or pay income tax or luxury tax, if it is one of those
          // ... and present insufficient funds dialog if needed.
          // TODO ^ all o' that
        }
        this.onEndTurn()
      })
    }
    move.bind(this)();
  }

  //////////////////////////////////////////
  // render
  //////////////////////////////////////////

  render () {
    let _this = this;

    function getSpaces (start, end) {
      return boardSpacesData.slice(start, end).map((space, i) => (
        <Space
          key={i}
          space={space}
          spaceIndex={start + i}
          players={_this.state.players}
        >
        </Space>
      ))
    }

    return (
      <div className="App">
        {this.state.gamePhase === gamePhases.PRE && (
          <GetPlayerInfo
            numPlayers={this.state.numPlayers}
            players={this.state.players}
            onChangeNumPlayers={this.onChangeNumPlayers}
            onChangePlayerName={this.onChangePlayerName}
            onChangePlayerToken={this.onChangePlayerToken}
            onStartGame={this.onStartGame}
          />
        )}
        {this.state.gamePhase !== gamePhases.PRE && (
          <div className={'game-stats'}>
            <table>
              <tbody>
                <tr>
                  <th> </th>
                  {this.state.players.slice(0, this.state.numPlayers).map(player =>
                    <th key={player.id}>
                      {player.token}
                    </th>
                  )}
                </tr>
                <tr>
                  <th>Properties Owned:</th>
                  {this.state.players.slice(0, this.state.numPlayers).map(player =>
                    <td key={player.id} className={'property-micro-indicators'}>
                      {player.properties.map(property =>
                        <div
                          key={property.name}
                          className={"property-micro-indicator"}
                          style={{background: property.group || '#eee'}}
                        >
                          {property.group === 'utility' ? 'U'
                          : property.group === 'railroad' ? 'R'
                          : ' '}
                        </div>
                      )}
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Money:</th>
                  {this.state.players.slice(0, this.state.numPlayers).map(player =>
                    <td key={player.id}>
                      {player.money}
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Net Worth:</th>
                  {this.state.players.slice(0, this.state.numPlayers).map(player =>
                    <td key={player.id}>
                      {player.money + player.properties.reduce((total, property) => total + property.price, 0)}
                    </td>
                  )}
                </tr>
                <tr>
                  <th>Trips Around<br/>the Block</th>
                  {this.state.players.slice(0, this.state.numPlayers).map(player =>
                    <td key={player.id}>
                      {player.orbits}
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
            <div>
              <span>Properties Left: </span>
              <strong>
                {28 - this.state.players.reduce((totalProperties, player) => totalProperties + player.properties.length, 0)}
              </strong>
            </div>
            <div>
              <span>Turns Taken: </span>
              <strong>
                {this.state.numTurnsTotal}
              </strong>
            </div>
          </div>
        )}
        <div className={'board'}>
          <div className="edge edge--bottom">
            {getSpaces(0, 10)}
            <div className="edge edge--left">
              {getSpaces(10, 20)}
              <div className="edge edge--top">
                {getSpaces(20, 30)}
                <div className="edge edge--right">
                  {getSpaces(30, 40)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default App
