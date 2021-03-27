const express = require('express');

const app = express();

const React = require('react');
const ReactDomServer = require('react-dom/server');
const Component = require('./src/App');

app.get('/', function(req, res) {
  const content = ReactDomServer.renderToString(
    React.createElement(Component)
  )
  console.log('content>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', content)
  res.send(content)
})

app.listen(3003)