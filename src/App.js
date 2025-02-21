import React, { Component } from 'react'
import Space from './Space'
import GetPlayerInfo from './components/GetPlayerInfo'
import boardSpacesData from './data/boardSpacesData'
import chanceCards from './data/chanceCards'
import communityChestCards from './data/communityChestCards'
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
      players: [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => ({
        id: i,
        name: '',
        token: '',
        spaceIndex: 0,
        money: 1500,
        properties: [],
        numDoubles: 0,
        numGetOutOfJailFreeCards: 0,
        isInJail: false,
        numTurnsInJail: 0,
        orbits: 0,
      })),
      indexOfWhoseTurnItIs: 0,
      chanceCards: this.getShuffledCards(chanceCards),
      communityChestCards: this.getShuffledCards(communityChestCards),
    }

    // self-bind all methods
    this.onChangeNumPlayers = this.onChangeNumPlayers.bind(this)
    this.onChangePlayerName = this.onChangePlayerName.bind(this)
    this.onChangePlayerToken = this.onChangePlayerToken.bind(this)
    this.onStartGame = this.onStartGame.bind(this)
    this.onEndTurn = this.onEndTurn.bind(this)
    this.simulateTurn = this.simulateTurn.bind(this)

    console.log('App c\'tor, typeof `this`:', typeof this, this.constructor)
  }

  getShuffledCards (originalCards) {
    let newCards = []
    // copy the originals
    originalCards.forEach(card => newCards.push(Object.assign({}, card)))
    // shuffle the copies
    newCards.sort(() => Math.random() < .5 ? -1 : 1)
    return newCards
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

  getNetWorth (player) {
    return player.money + player.properties.reduce((total, property) => total + property.price, 0)
  }

  indexOfOwner (space) {
    for (let i = 0; i < this.state.numPlayers; i++) {
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
      // rails before utils
      if(aIsRail && bIsUtil) return -1;
      if(aIsUtil && bIsRail) return 1;
      // rails and utils before others
      if(aIsRail || aIsUtil) return -1;
      if(bIsRail || bIsUtil) return 1;
      // "board" order
      return aIndex < bIndex ? -1 : 1
    })
    let numProperties = player.properties.length
    let suffix;
    if (numProperties === 1) {
      suffix = 'st'
    }
    if (numProperties === 2) {
      suffix = 'nd'
    }
    if (numProperties === 3) {
      suffix = 'rd'
    }
    if (numProperties > 3) {
      suffix = 'th'
    }
    console.log('📃', player.token, 'bought her/his', '' + numProperties + suffix, 'property:', property.name, 'for', property.price, 'new balance', player.money)
  }

  payRent (player, owner, rentMultiplier) {
    // does the owner own all properties in the group?
    let space = boardSpacesData[player.spaceIndex]
    // console.log('about to pay rent...', JSON.stringify(space));
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
      rent = property.rents[numPropertiesOwnedInGroup] * (rentMultiplier || 1)
    }
    // is it a utility?
    else if (property.group === 'utility') {
      // then rent is based on number of utilites owned, AND THE ROLL OF THE DICE
      let dieValue1 = Math.ceil(Math.random() * 6)
      let dieValue2 = Math.ceil(Math.random() * 6)
      let diceValue = dieValue1 + dieValue2
      console.log('rolled dice: ', diceValue)
      rent = Math.round(diceValue * (rentMultiplier || (numPropertiesOwnedInGroup === 2 ? 10 : 4)))
    }
    else {
      // it's a regular property
      rent = property.rents[property.numHouses]
      if (property.numHouses === 0 && ownerHasMonopoly) {
        // no houses, but has a monopoly, rent is double
        rent *= 2
      }
    }
    // todo - if player has insufficient funds.
    // for now, assume it's ok
    player.money -= rent
    owner.money += rent
    console.log('💸', player.token, 'payed', rent, 'rent to', owner.token, 'for landing on', space.name)
  }

  simulateTurn () {
    let _this = this
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
        console.log('🚓', player.token, '!!!!!!!!!!!!!!! rolled doubles three times, went to jail')
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
        console.log('💰', player.token, 'landed on or passed GO and collected $200, now has', player.money)
      }
      this.setState({
        players: players
      }, function () {
        // console.log(i, diceValue);
        if (++i < diceValue) {
          setTimeout(move.bind(this), 100)
          return
        }
        console.log(player.token, 'advanced to', boardSpacesData[player.spaceIndex].name || boardSpacesData[player.spaceIndex].type)
        let space = boardSpacesData[player.spaceIndex]
        let indexOfOwner = _this.indexOfOwner(space)
        if (space.type === 'property') {
          if (indexOfOwner >= 0) {
            // it's owned.  do you own it?
            if (indexOfOwner !== this.state.indexOfWhoseTurnItIs) {
              // nope, pay rent.
              _this.payRent(player, players[indexOfOwner])
              _this.setState({
                players: players
              })
            }
          } else {
            // it's unowned
            // for the sake of simulation, buy it if you have enough money
            if (player.money >= space.price) {
              _this.buyProperty(player, space)
              _this.setState({
                players: players
              })
            }
          }
        } else {
          // or pay income tax or luxury tax, if it is one of those
          if (space.type === 'income tax') {
            console.log(player.token, 'landed on income tax and paid', Math.min(_this.getNetWorth(player), 200))
            player.money -= Math.min(_this.getNetWorth(player), 200)
          }
          if (space.type === 'luxury tax') {
            console.log(player.token, 'landed on luxury tax and paid 75')
            player.money -= 75
          }

          // todo: chance and community chest are basically identical in the way they work, the following can be simplified.

          if (space.type === 'chance') {
            // warn! - do not directly alter state!
            let card = _this.state.chanceCards.pop()
            if (!card) {
              _this.setState({
                chanceCards: _this.getShuffledCards(chanceCards),
              }, function () {
                // warn! - do not directly alter state!
                card = _this.state.chanceCards.pop()
                console.log(`%c${player.token} chance card: ${card.title}`, "background: orange; color: black; padding: 3px;")
                card.action.call(_this, player, players)
              })
            } else {
              console.log(`%c${player.token} chance card: ${card.title}`, "background: orange; color: black; padding: 3px;")
              card.action.call(_this, player, players)
            }
          }

          // or get chance or community chest card, if it is one of those
          if (space.type === 'community chest') {
            // warn! - do not directly alter state!
            let card = _this.state.communityChestCards.pop()
            if (!card) {
              _this.setState({
                communityChestCards: _this.getShuffledCards(communityChestCards),
              }, function () {
                // warn! - do not directly alter state!
                card = _this.state.communityChestCards.pop()
                console.log(`%c${player.token} community chest card: ${card.title}`, "background: yellow; color: black; padding: 3px;")
                card.action.call(_this, player, players)
              })
            } else {
              console.log(`%c${player.token} community chest card: ${card.title}`, "background: yellow; color: black; padding: 3px;")
              card.action.call(_this, player, players)
            }
          }

          // todo: present insufficient funds dialog if needed.

        }
        _this.onEndTurn()
      })
    }
    move.bind(this)();
  }

  //////////////////////////////////////////
  // render
  //////////////////////////////////////////

  render () {
    let _this = this;

    // resize board to fit.
    let viewportWidth = document.body.offsetWidth
    let boardWidth = 1200
    let style = {}
    if (viewportWidth < boardWidth) {
      style.transform = 'scale(' + ((viewportWidth - 30) / boardWidth) + ')'
      style.transformOrigin = 'top left'
      // todo - figure out how much it has to be translated too, up & to the left.
    }

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
      <div
        className="App"
        style={style}
      >
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
                      {_this.getNetWorth(player)}
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
        <div
          className={'board' + (this.state.gamePhase === gamePhases.REGULAR ? '' : ' blurred')}
        >
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
