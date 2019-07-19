import React from 'react';

function Space (props) {
  var space = props.space;
  return (
    <div
      className={[
        'space',
        space.type.replace(/ /g, '-'),
        (space.group || '').replace(/ /g, '-') +
        (/\b(go|jail|free)\b/.test(space.type) ? 'corner' : ''),
      ].join(' ')}
    >
      {space.name || space.type}
    </div>
  );
}

export default Space;
