import boardSpacesData from '../data/boardSpacesData'

function advancePlayerToSpace (player, space, isGoToJail) {
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
    if (!isGoToJail) {
      player.money += 200
      player.orbits++
    }
    advance(0)
  }
}

export default advancePlayerToSpace
