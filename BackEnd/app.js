'use strict';
const express = require('express');
const cors = require('cors');
const buildingData = require('./lib/build.js');
const buildingDataWrapper = new buildingData();

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send({
    "api":"Cambridge Map",
    "version": "1.0.0",
    "endpoints": ["/buildingTypes", "/buildings"]
  })
});

app.get('/buildingTypes', (req, res) => {
  res.send(buildingDataWrapper.getBuildingTypesResource());
});

app.get('/buildings', (req, res) => {
  res.send(buildingDataWrapper.getDataResource());
});

app.listen(PORT, HOST,  () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

