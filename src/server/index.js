// require .env file with all related environment variabls
require('dotenv').config()

// require express, cors
const express = require('express');
const cors = require('cors');

const getTripdata = require('./getTripdata')
const app = express();

// middleware configuration
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// cross origin allowance
app.use(cors());
// initialize distribution folder 
app.use(express.static('dist'));

// initialize POST endpoint to get all trip data based on the user input

app.post('/trip', async (req, res) => {
  try {
    const tripdata = await getTripdata(req.body)
    res.send(tripdata)
  } catch(error) {
    console.log('error', error)
  }
})

app.listen(8081, function () {
  console.log('Application listening on port 8081!')
})