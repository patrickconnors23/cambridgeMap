'use strict';
const express = require('express');
const buildingData = require('./lib/build.js');
const buildingDataWrapper = new buildingData();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
  res.send("Welcome to the node.js api\n");
});

app.get('/getBuildingTypes', (req, res) => {
  res.send(buildingDataWrapper.getBuildingTypesResource());
});

app.get('/getBuildingData', (req, res) => {
  res.send(buildingDataWrapper.getDataResource());
});

app.listen(PORT, HOST,  () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

