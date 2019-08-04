import React from 'react'
import tokens from '../data/tokens'

function GetPlayerInfo (props) {
  return (
    <div className='get-player-info'>

      {/* NUMBER OF PLAYERS */}
      <div className='row'>
        <div className='col'>
          Number of Players:
          {' '}
        </div>
        <div className='col'>
          {[2, 3, 4, 5, 6, 7, 8].map(n =>
            <div className='field' key={n}>
              <label className='radio'>
                <input
                  type='radio'
                  value={n}
                  checked={props.numPlayers === n}
                  onChange={props.onChangeNumPlayers}
                />
                <span className='label'>
                  {n}
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      {/* PLAYERS */}
      {props.players.slice(0, props.numPlayers).map(player =>
        <div className='row' key={player.id}>
          <div className='col'>
            <div className='field'>
              <label>
                <span className='label'>
                  Player Name:
                  {' '}
                </span>
                <input
                  type='text'
                  name={'player' + player.id}
                  value={player.name}
                  onChange={function (e) { props.onChangePlayerName(player.id, e); }}
                />
              </label>
            </div>
          </div>
          <div className='col'>
            <div className='field'>
              <label>
                <span className='label'>
                  Token:
                  {' '}
                </span>
                <select
                  name={'token' + player.id}
                  value={player.token}
                  onChange={function (e) { props.onChangePlayerToken(player.id, e); }}
                >
                  <option value=''>Select</option>
                  {tokens.map(token =>
                    <option
                      key={token}
                      disabled={props.players.some(otherPlayer =>
                        otherPlayer.id < props.numPlayers && otherPlayer.token === token
                      )}
                    >
                      {token}
                    </option>
                  )}
                </select>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* START GAME */}
      <div className='row'>
        <div className='col'>
          <button
            onClick={props.onStartGame}
          >
            Start
          </button>
        </div>
      </div>

    </div>
  )
}

export default GetPlayerInfo
