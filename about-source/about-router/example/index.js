const express = require("express");
const path = require('path');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './history.html'))
})

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, './history.html'))
})

app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, './history.html'))
})

app.listen(8080, () => {
  console.log("app started on port 3000")
})