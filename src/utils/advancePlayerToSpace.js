import boardSpacesData from '../data/boardSpacesData'

// todo: animate it instead of just jumping there
// todo: ^ i.e., move forward one space at a time until reaching the destination
// todo: refactor this to combine it with the logic in App.js.

/**
 * Advance Player to Space
 * @param player
 * @param space can either be an object that is similar to the target space, or it can be the INDEX of the target space
 * @param rentMultiplier
 */
function advancePlayerToSpace (player, space, rentMultiplier) {
  function advance (startIndex) {
    let candidateSpace
    for (let i = startIndex; i < boardSpacesData.length; i++) {
      candidateSpace = boardSpacesData[i]
      if (
        (space.name && space.name === candidateSpace.name) ||
        (space.group && space.group === candidateSpace.group)
      ) {
        player.spaceIndex = i
        return true;
      }
    }
    // default return value is `undefined`, which is falsy.  we should probably be explicit and return false, but no need really.
  }
  // is it before 'GO'?
  if (!advance(player.spaceIndex + 1)) {
    // nope, it wasn't, so we advance to GO, collect $200, and continue searching, starting with 'GO' (the 0th space)
    player.money += 200
    player.orbits++
    console.log('💰', player.token, 'landed on or passed GO and collected $200, now has', player.money)
    advance(0)
  }

  let _this = this
  // rent?
  let _space = boardSpacesData[player.spaceIndex]

  if (_space.type === 'go to jail') {
    player.spaceIndex = 10
    player.isInJail = true
    player.numTurnsInJail = 0
    return
  }

  let indexOfOwner = _this.indexOfOwner(_space)
  let players = _this.state.players
  if (_space.type === 'property') {
    if (indexOfOwner >= 0) {
      // it's owned.  do you own it?
      if (indexOfOwner !== this.state.indexOfWhoseTurnItIs) {
        // nope, pay rent.
        _this.payRent(player, players[indexOfOwner], rentMultiplier)
        _this.setState({
          players: players
        })
      }
    } else {
      // it's unowned
      // for the sake of simulation, buy it if you have enough money
      if (player.money >= _space.price) {
        _this.buyProperty(player, _space)
        _this.setState({
          players: players
        })
      }
    }
  }

}

export default advancePlayerToSpace
