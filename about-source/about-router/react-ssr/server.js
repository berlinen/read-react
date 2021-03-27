const express = require('express');

const app = express();

const React = require('react');
const ReactDomServer = require('react-dom/server');
const path = require('path');
const fs = require("fs");
const Component = require('./src/App');
const BlogComponent = require('./src/Blog');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

const getBlogData = () => {
  return {
    res: "this is data from server"
  }
}

app.get('/', function(req, res) {
  const entryFile = fs.readFileSync(path.resolve(__dirname, "./build/index.html"), 'utf-8');

  let data = {};
  const random = Math.random() > 0.5;
  try {
    if (random) {
      throw 123;
    }
    data = getBlogData();
  } catch {
    data = { res: "" };
  }

  const content = ReactDomServer.renderToString(
    React.createElement(BlogComponent, data)
  );

  app.use(express.static('build'));

  res.send(
    entryFile.replace(
      `<div id="root"></div>`,
      `
        <div id="root">${content}</div>
        <script>
          window.__INIT_DATA__ = ${JSON.stringify(data)};
        </script>
      `
    )
  );
})

app.get('/api/data', async function(req, res) {
  await sleep(2000);
  res.json(getBlogData());
})

app.listen(3003)