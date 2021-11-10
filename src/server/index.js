// require .env file with all related environment variabls
require('dotenv').config()

// require express, cors
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
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


const getTripdata = async (input) => {
  // console.log(input)
  // get all relevant env variables
  // geonames API
  const geonames_base_url = process.env.GEONAMES_BASE_URL
  const geonames_user_name = process.env.GEONAMES_USER
  // weatherbit API
  const weatherbit_base_url = process.env.WEATHERBIT_BASE_URL
  const weatherbit_api_key = process.env.WEATHERBIT_API_KEY 
  // pixabay API
  const pixabay_base_url = process.env.PIXABAY_BASE_URL
  const pixabay_api_key = process.env.PIXABAY_API_KEY
  // set all variables based on the user inpu
  const destinationInput = input.destination
  const tripstart = input.tripstart
  const tripend = input.tripend
  // console.log(`destination: ${destination}, tripstart: ${tripstart}, tripend: ${tripend}`)
  try {
    
    // 1A. use input destination to get coordinates (geonames API)
    const geonamesURL = `${geonames_base_url}?username=${geonames_user_name}&maxRows=1&q=${destinationInput}`
    const geonamesRes = await axios.get(geonamesURL)
    // declare latitude, longitude and country name received from geonames API
    const { lat, lng, countryName, name } = geonamesRes.data.geonames[0];
    const destination = name
    // 2A. use coordinates (depending on 1A. geonames API) to request weather forecast (weatherbit API)
    const weatherbitURL = `${weatherbit_base_url}forecast/daily?key=${weatherbit_api_key}&lat=${lat}&lon=${lng}`
    const weatherbitReq = axios.get(weatherbitURL)
    // 2B. use geonames destination to get images (pixabay API)
    const removeBlanks = destination.replaceAll(' ', '+')
    const pixabayURL = `${pixabay_base_url}?key=${pixabay_api_key}&q=${removeBlanks}&image_type=photo&category=travel`
    const pixabayReq = axios.get(pixabayURL)
    // 2C. use country name (depending on 1A. geonamse API) to request picture for country
    const pixabayURL2 = `${pixabay_base_url}?key=${pixabay_api_key}&q=${countryName}&image_type=photo&category=travel`
    const pixabayReq2 = axios.get(pixabayURL2)
    // execute all three requests with Promise.all() to be sure all requests are executed successfully
    const [weatherbitRes, pixabayRes, pixabayRes2] = await Promise.all([weatherbitReq, pixabayReq, pixabayReq2])
    // now all results are available
    // form results into target format
    const enrichedDestination = destination === countryName ? destination : `${destination}, ${countryName}`;
    const pixabayPicture = pixabayRes.data.totalHits > 0 ? pixabayRes.data.hits[0] : pixabayRes2.data.hits[0];
    // store all information as function return
    const data = {
      destination: enrichedDestination,
      weather: weatherbitRes.data.data,
      picture: pixabayPicture,
      countdown: input.countdown,
      duration: input.duration,
      tripstart: tripstart,
      tripend: tripend
    }
    return data
  } catch(error) {
    console.log(error)
  }
}

app.listen(8081, function () {
  console.log('Application listening on port 8081!')
})