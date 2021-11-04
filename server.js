// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies*/
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5500
const server = app.listen(port, ()=>{
  console.log('server running');
  console.log(`running on localhost: ${port}`);
});

// create server routes 
// GET route that returns the projectData
app.get('/all', function(req, res) {
  res.send(projectData);
});
// POST route that adds incoming data to projectData
// should receive the following values from the request body: temperature, date, user response
app.post('/addData', addData);

function addData(req, res){
  projectData['date'] = req.body.date;
  projectData['desc'] = req.body.desc;
  projectData['icon'] = req.body.icon;
  projectData['name'] = req.body.name,
  projectData['feels'] = req.body.feels;
  projectData['temp'] = req.body.temp;
  projectData['user'] = req.body.user;
  
  res.send(projectData);
  // console.log(`the data is pushed`)
}