import React from 'react';

function Space (props) {
  var space = props.space;
  var isCorner = /\b(go|jail|free)\b/.test(space.type);
  var isRailroad = (space.name || '').match(/railroad/i);
  var isUtility = (space.name || '').match(/electric|water/i);
  var hasPropertyGroupColor = !isRailroad && !isUtility && space.type === 'property';
  return (
    <div
      className={[
        'space',
        space.type.replace(/ /g, '-'),
        (space.group || '') +
        (isCorner ? 'space--corner' : ''),
      ].join(' ')}
    >
      {hasPropertyGroupColor &&
        <div
          className={'space__color'}
          style={{backgroundColor: (space.group || '')}}
        >
          {/* intentionally empty */}
        </div>
      }
      <div className={'space__name'}>
        {space.name || space.type}
      </div>
      <div className={'space__players'}>
        {props.players.map(player =>
          player.spaceIndex === props.spaceIndex &&
          <div className={'space__player'} title={player.name} key={player.id}>
            {player.token}
          </div>
        )}
      </div>
    </div>
  );
}

export default Space;
