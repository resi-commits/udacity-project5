function performAction(event){
  getInput(event).then((input)=>{
    submitData('http://localhost:8081/trip', input).then((res)=>{
      updateUI(res)
    })
  })
}

const getInput = async () => {
  const destination = document.getElementById('destination').value
  const tripstart = new Date(document.getElementById('tripstart').value)
  const tripend = new Date(document.getElementById('tripend').value)
  const countdown = Client.calculateCountdown(tripstart)
  // validate input
  // check for valid destination (text input)
  if (Client.checkForRequiredData(destination)) {
    if (countdown >= 0) {
      const duration = Client.calculateDuration(tripstart, tripend)
      const values = {
        destination: destination,
        tripstart: tripstart,
        tripend: tripend,
        countdown: countdown,
        duration: duration
      }
      return values
    } else {
      alert('Please enter a valid trip start date that is in the future.')
    }
  } else {
    alert('Please enter a valid city name.')
  }
}

const submitData = async (url = '', input = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  try {
    return await res.json()
  } catch(error) {
    console.log('error', error)
  }
}

const updateUI = async (data) => {
  document.getElementById('destination').innerHTML = data.destination;
  let counter = 0
  if (data.countdown <= 15) {
    counter = data.countdown
  } else {
    counter = 15
  }
  document.getElementById('travelDestination').innerHTML = `Your next trip goes to ${data.destination}`;
  document.getElementById('countdown').innerHTML = `${counter+1} days until you leave`;
  document.getElementById('destinationImage').style.backgroundImage = `url(${data.picture.webformatURL})`
  const tripstart = new Date(data.tripstart)
  const ts = tripstart.getDate()+'.'+ (tripstart.getMonth()+1)+'.'+ tripstart.getFullYear();
  if (data.tripend) {
    const tripend = new Date(data.tripend)
    const te = tripend.getDate()+'.'+ (tripend.getMonth()+1)+'.'+ tripend.getFullYear();
    document.getElementById('date').innerHTML = `You will start on the ${ts}, stay for ${data.duration} days and leave on the ${te}`;
  } else {
    document.getElementById('date').innerHTML = `You will start on the ${ts}`;
  }
  document.getElementById('currentTemp').innerHTML = `The current temperature is: ${data.weather[0].temp}°C`;
  document.getElementById('currentIcon').style.backgroundImage = `url(https://www.weatherbit.io/static/img/icons/${data.weather[0].weather.icon}.png)`;
  document.getElementById('currentMinMaxTemp').innerHTML = `min: ${data.weather[0].min_temp}°C, max: ${data.weather[0].max_temp}°C`;
  document.getElementById('forecastTemp').innerHTML = `Forecast temperature in ${counter+1} days: ${data.weather[counter].temp}°C`;
  document.getElementById('forecastIcon').style.backgroundImage = `url(https://www.weatherbit.io/static/img/icons/${data.weather[counter].weather.icon}.png)`;
  document.getElementById('forecastMinMaxTemp').innerHTML = `min: ${data.weather[counter].min_temp}°C, max: ${data.weather[counter].max_temp}°C`;
}

export { performAction }