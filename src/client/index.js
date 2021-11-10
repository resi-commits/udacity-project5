import { checkForRequiredData, calculateCountdown, calculateDuration } from './js/helpers';
import { performAction } from './js/tripplanner'
import './styles/style.scss'
import './styles/header.scss'
import './styles/footer.scss'
import './styles/input.scss'
import './styles/output.scss'
import './styles/_base.scss'

// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

export {
  performAction,
  checkForRequiredData,
  calculateCountdown,
  calculateDuration
}