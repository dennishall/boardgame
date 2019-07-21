import React from 'react';

import Space from './Space';

import boardSpacesData from './boardSpacesData';

import './App.scss';

function App() {
  return (
    <div className="App">
      <div className="edge edge--bottom">
        {boardSpacesData.map((space, i) => (
          i < 10 ?
            <Space
              key={i}
              space={space}
            >
            </Space>
            : ''
        ))}
        <div className="edge edge--left">
          {boardSpacesData.map((space, i) => (
            i > 9 && i < 20 ?
              <Space
                key={i}
                space={space}
              >
              </Space>
              : ''
          ))}
          <div className="edge edge--top">
            {boardSpacesData.map((space, i) => (
              i > 19 && i < 30 ?
                <Space
                  key={i}
                  space={space}
                >
                </Space>
                : ''
            ))}
            <div className="edge edge--right">
              {boardSpacesData.map((space, i) => (
                i > 29 ?
                  <Space
                    key={i}
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
