import { checkForRequiredData, calculateCountdown, calculateDuration } from './js/helpers';
import { performAction } from './js/tripplanner'
import './styles/style.scss'

// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

export {
  performAction,
  checkForRequiredData,
  calculateCountdown,
  calculateDuration
}