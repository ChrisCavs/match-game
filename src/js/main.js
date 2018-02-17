import {renderCards} from './renderCards'
import {generateCardValues} from './generateCardValues'

const main = () => {

  window.localStorage.clear()

  const button = document.querySelector('button')

  button.addEventListener('click', function () {
    window.localStorage.clear()
    renderCards(generateCardValues())
  })

  renderCards(generateCardValues())
}

document.addEventListener('DOMContentLoaded', main)
