/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=fedf4384c03e6130b3fd1de93c0832b8'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();


let data = [];
// async function to make a GET request to the openweathermap using the zip code
const getWeather = async (event)=>{
  // console.log(event)
  let zip = `${document.getElementById('zip').value},de`
  const units = '&units=metric'
  const res = await fetch(baseURL+zip+units+apiKey)
  try {
    data = await res.json();
    // console.log(data);
  } catch(error) {
    console.log("error", error);
  }
}

// async function to make a POST request to store the API data and user input to the project data
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
  const res = await fetch('/all');
  try {
    const allData = await res.json();
    document.getElementById('date').innerHTML = allData.date;
    document.getElementById('content').innerHTML = `Today you are feeling like this: ${allData.user}`
    document.getElementById('icon').style.backgroundImage = `url("http://openweathermap.org/img/wn/${allData.icon}@2x.png")`
    document.getElementById('desc').innerHTML = allData.desc
    document.getElementById('name').innerHTML = allData.name
    document.getElementById('temp').innerHTML = `Current temperature ${allData.temp}°C`
    document.getElementById('feels').innerHTML = `Feels like ${allData.feels}°C`
    document.getElementById('date').innerHTML = `Today is the ${allData.date}`
  } catch(error) {
    console.log("error", error);
  }
}

// let zip = document.getElementById('zip').value
// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(event){
  getWeather(event).then(()=>{
    storeData('/addData', { 
      temp: data.main.temp, 
      feels: data.main.feels_like,
      icon: data.weather[0].icon,
      desc: data.weather[0].description,
      name: data.name,
      date: newDate, 
      user: document.getElementById('feelings').value
    });
  })
  .then(()=>{
    updateUI();
  })
}
  