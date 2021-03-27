import React from 'react';

import Blog from './Blog';

import ReactDOM from 'react-dom';

// const Blog = require('./Blog');



ReactDOM.render(
  <React.StrictMode>
   <Blog />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
