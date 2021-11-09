// require .env file with all related environment variabls
require('dotenv').config()
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
// using axios for making an async post request
const axios = require('axios')
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));



app.get('/', function (req, res) {
  res.sendFile('dist/index.html')
  // res.sendFile(path.resolve('src/client/views/index.html'))
})

// create server routes 
// GET route that returns the projectData
app.get('/all', function(req, res) {
  res.send(projectData);
});
// POST route that adds incoming data to projectData
// should receive the following values from the request body: temperature, date, user response
app.post('/addData', addData);

function addData(req, res){
  projectData['count'] = req.body.count;
  projectData['lat'] = req.body.lat;
  projectData['lng'] = req.body.lng;
  projectData['name'] = req.body.name,
  projectData['country'] = req.body.country;
  projectData['countryCode'] = req.body.countryCode;
  
  res.send(projectData);
  // console.log(`the data is pushed`)
}

// get env variables for Weatherbit API request
const weatherbit_base_url = process.env.WEATHERBIT_BASE_URL
const weatherbit_api_key = process.env.WEATHERBIT_API_KEY

app.post('/weather', async (req, res)=> {
  // console.log(req.body)
  // console.log(weatherbit_base_url)
  // console.log(weatherbit_api_key)
  // let weatherreq = ''
  console.log(req.body.count)
  let weatherreq = `${weatherbit_base_url}forecast/daily?key=${weatherbit_api_key}&lat=${req.body.lat}&lon=${req.body.lon}`
  // if (req.body.count <= 15) {
  //   weatherreq = `${weatherbit_base_url}forecast/daily?key=${weatherbit_api_key}&lat=${req.body.lat}&lon=${req.body.lon}`
  // } else {
  //   let date = new Date(req.body.date)
  //   console.log(date)
  //   const year = date.getFullYear() - 10
  //   const month = date.getMonth() + 1
  //   const day = date.getDate()
  //   console.log(year)
  //   console.log(month)
  //   console.log(day)
  //   weatherreq = `${weatherbit_base_url}history/daily?key=${weatherbit_api_key}&lat=${req.body.lat}&lon=${req.body.lon}&start_date=${year}-${month}-01&end_date=${year}-${month}-28`
  // }
  try {
    const {
      data: {
        data,
        city_name,
        state_code,
        country_code,
        lat,
        lon
      },
    } = await axios(weatherreq)
    
    // need to add +1 as the count start counting with 0 for 1 day in the future
    let countDays = req.body.count + 1
    console.log(data[countDays])
    if (countDays > 15) {
      res.send({
        cityName: city_name,
        countryCode: country_code,
        stateCode: state_code,
        lat: lat,
        lon: lon,
        temp: data[15].temp,
        lowTemp: data[15].low_temp,
        max_temp: data[15].max_temp,
        date: data[15].datetime,
        icon: data[15].weather.icon,
        iconDescription: data[15].weather.description
      })
    } else {
      res.send({
        cityName: city_name,
        countryCode: country_code,
        stateCode: state_code,
        lat: lat,
        lon: lon,
        temp: data[req.body.count].temp,
        lowTemp: data[countDays].low_temp,
        max_temp: data[countDays].max_temp,
        date: data[countDays].datetime,
        iconPath: `https://www.weatherbit.io/static/img/icons/${data[countDays].weather.icon}.png`,
        iconDescription: data[countDays].weather.description
      })
    }
    console.log(`https://www.weatherbit.io/static/img/icons/${data[countDays].weather.icon}.png`)
  } catch(error) {
    console.log(error)
  }
})

const pixabay_base_url = process.env.PIXABAY_BASE_URL
const pixabay_api_key = process.env.PIXABAY_API_KEY

app.post('/image', async (req, res) => {
  let name = projectData.name
  let pixabayreq = `${pixabay_base_url}?key=${pixabay_api_key}&q=${name.replaceAll(' ', '+')}&image_type=photo&category=place`
  console.log(pixabayreq)
  try {
    const {
      data: {
        hits
      },
    } = await axios(pixabayreq)
    console.log(hits[1])
    console.log(hits[0].webformatURL)
    res.send({
      cityName: name,
      webformatURL: hits[0].webformatURL
    })
  } catch(error) {
    console.log(error)
  }
})

app.listen(8081, function () {
  console.log('Application listening on port 8081!')
})