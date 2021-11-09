function performAction(event){
  getInput(event).then((input)=>{
    console.log(input)
    const res = submitData('http://192.168.200.1:8081/trip', input).then(()=>{
      console.log(res)
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

export { performAction }