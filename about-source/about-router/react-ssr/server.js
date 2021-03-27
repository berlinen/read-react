const express = require('express');

const app = express();

const React = require('react');
const ReactDomServer = require('react-dom/server');
const Component = require('./src/App');
const BlogComponent = require('./src/Blog');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

const getBlogDate = () => {
  return {
    res: "this is data from server"
  }
}

app.get('/', function(req, res) {
  const data = getBlogDate();
  const content = ReactDomServer.renderToString(
    React.createElement(BlogComponent, data)
  );

  res.send(content);
})

app.get('/api/data', async function(req, res) {
  await sleep(2000);
  res.json(getBlogDate());
})

app.listen(3003)