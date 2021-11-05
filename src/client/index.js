import { performAction } from './js/app'
import './styles/style.scss'

// adding event listener to the generate button
document.getElementById('generate').addEventListener('click', performAction);

export {
  performAction
}