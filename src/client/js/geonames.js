
// Global variables
const baseURL = 'http://api.geonames.org/searchJSON?maxRows=10&username=theadam&q='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();

let data = {};
let count = {};
// async function to make a GET request to the openweathermap using the zip code
const getCoords = async (event)=>{
  // console.log(event)
  let city = document.getElementById('zip').value
  let tripstart = new Date(document.getElementById('tripstart').value)
  if (Client.checkForRequiredData(city)) {
    count = countdown(tripstart)
    // console.log(count)
    if (count >= 0) {
      const res = await fetch(baseURL+city)
      try {
        data = await res.json();
        // console.log(data);
      } catch(error) {
        console.log("error", error);
      }
    } else {
      alert('Please enter a valid trip start date. Must be in the future!')
    }
  } else {
    alert('Please enter a valid city name!')
  } 
}

const storeData = async (url = '', data = {})=>{
  const res = await fetch(url, {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
});
  try {
    // console.log(data)
    // console.log(res)
    const newData = await res.json();
    // console.log(newData)
    return newData;
  } catch(error) {
    console.log("error", error);
  }
}

// async function to get all data stored in the projectData
const updateUI = async ()=>{
  const res = await fetch('http://192.168.200.1:8081/all');
  try {
    const allData = await res.json();
    console.log(allData)
    // document.getElementById('date').innerHTML = allData.date;
    // document.getElementById('content').innerHTML = `Today you are feeling like this: ${allData.user}`
    // document.getElementById('icon').style.backgroundImage = `url("http://openweathermap.org/img/wn/${allData.icon}@2x.png")`
    // document.getElementById('desc').innerHTML = allData.desc
    // document.getElementById('name').innerHTML = allData.name
    // document.getElementById('temp').innerHTML = `Current temperature ${allData.temp}°C`
    // document.getElementById('feels').innerHTML = `Feels like ${allData.feels}°C`
    // document.getElementById('date').innerHTML = `Today is the ${allData.date}`
  } catch(error) {
    console.log("error", error);
  }
}

function countdown(tripstart) {
  const day = 1000 * 60 * 60 * 24
  // calculate distance from tripstart until today
  let distance = tripstart - d
  if (distance < 0) {
    return -1
  } else {
    return Math.floor(distance/ day)
  }
}

// request Weather API on server side for selected city
const requestWeather = async (url = '', data= {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    // console.log(res)
    return await res.json()
  } catch(error) {
    console.log('error', error)
  }
}

const requestImage = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  try {
    // console.log(res)
    return await res.json()
  } catch(error) {
    console.log('error', error)
  }
}

function performAction(event){
  let tripstart = new Date(document.getElementById('tripstart').value)
  getCoords(event).then(()=>{
    storeData('http://192.168.200.1:8081/addData', { 
      lat: data.geonames[0].lat, 
      lng: data.geonames[0].lng,
      country: data.geonames[0].countryName,
      countryCode: data.geonames[0].countryCode,
      name: data.geonames[0].name,
      count: count,
      today: newDate,
      tripstart: tripstart
    });
  })
  .then(()=>{
    requestWeather('http://192.168.200.1:8081/weather', {lat: data.geonames[0].lat, lon: data.geonames[0].lng, count, date: tripstart})  
    .then((dat)=>{
      console.log(dat)
      requestImage('http://192.168.200.1:8081/image', {city: dat.cityName})
    })
  })
  .then((dati)=>{
    updateUI(dati);
  })
  
}

// export { performAction }