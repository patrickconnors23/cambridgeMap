'use strict';
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send("Welcome to the node.js api\n");
});

app.get('/resource', async (req, res) => {
  res.send(data);
});

app.listen(PORT, HOST,  () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

