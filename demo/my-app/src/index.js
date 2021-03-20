import React from './react';
import ReactDom from './react-dom';

class Log ex

ReactDom.render(
  <div className="h1" onEvent="event" prop1="prop1" prop2={{a: 1}}>
    现在时间：
    {new Date().getTime()}
    <p>p-tag</p>
  </div>,
  document.getElementById('root')
)
