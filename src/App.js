import React from 'react';

import Space from './Space';

import boardSpacesData from './boardSpacesData';

import './App.scss';

function App () {

  var tenSpacesStart = -10;

  function tenSpaces () {
    tenSpacesStart += 10;
    return boardSpacesData.slice(tenSpacesStart, tenSpacesStart + 10).map((space, i) => (
      <Space
        key={i}
        space={space}
      >
      </Space>
    ))
  }

  return (
    <div className="App">
      <div className="edge edge--bottom">
        {tenSpaces()}
        <div className="edge edge--left">
          {tenSpaces()}
          <div className="edge edge--top">
            {tenSpaces()}
            <div className="edge edge--right">
              {tenSpaces()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
