import { checkForRequiredData } from './js/required'
import { performAction } from './js/geonames'
import './styles/style.scss'

// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

export {
  performAction,
  checkForRequiredData
}