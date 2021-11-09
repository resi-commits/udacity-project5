function checkForRequiredData(destination) {
  if (destination.length < 2) {
    return false
  } else {
    return true
  }
}

const calculateCountdown = (start) => {
  const day = 1000 * 60 * 60 * 24
  let d = new Date();
  // calculate distance from tripstart until today
  let distance = start - d
  if (distance < 0) {
    return -1
  } else {
    return Math.floor(distance/ day)
  }
}

const calculateDuration = (start, end) => {
  if (end) {
    let duration = end.getTime() - start.getTime()
    return duration / (1000 * 3600 * 24)
  } else {
    return -1
  }
}

export { checkForRequiredData, calculateCountdown, calculateDuration }