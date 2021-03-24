const express = require("express");

const app = express();

app.get('/', (req, res) => {
  res.send(
    `
     <a href="/home">home</a>
     <a href="/about">about</a>
     <div id="app"></div>
    `
  );
})

app.get('/home', (req, res) => {
  res.send(
    `
     <a href="/home">home</a>
     <a href="/about">about</a>
     <div id="app"></div>
    `
  );
})

app.get('/about', (req, res) => {
  res.send(
    `
     <a href="/home">home</a>
     <a href="/about">about</a>
     <div id="app"></div>
    `
  );
})

app.listen(8080, () => {
  console.log("app started on port 3000")
})