import {generateCardValues} from './generateCardValues'
import {flipCard} from './flipCard'

//render the card array into the game div
const renderCards = (cardArray) => {

    //return to default css on card-container + play-again button
    const game = document.querySelector('.card-container')
    const button = document.querySelector('button')

    game.classList.remove('end')
    game.classList.remove('well-done')
    button.classList.remove('active')

    //set colors for backs of cards
    const colors = [
        'hsl(25, 85%, 65%)',
        'hsl(55, 85%, 65%)',
        'hsl(90, 85%, 65%)',
        'hsl(160, 85%, 65%)',
        'hsl(220, 85%, 65%)',
        'hsl(265, 85%, 65%)',
        'hsl(310, 85%, 65%)',
        'hsl(360, 85%, 65%)']

    //empty the game div
    while (game.firstChild) {
        game.removeChild(game.firstChild)
    }

    //for loop to create all cards
    for (var i = 0; i < cardArray.length; i++) {
        //create data object with info about card
        let value = cardArray[i]
        let color = colors[value-1]
        let flipped = false

        //create the card element, add the data
        let thisCard = document.createElement('div')
        thisCard.classList.add('card')
        thisCard.setAttribute('value', value)
        thisCard.setAttribute('color', color)
        thisCard.setAttribute('flipped', 'false')

        //add card to game div
        game.appendChild(thisCard)
    }

    //when card is clicked, apply flipcard function
    Array.from(document.querySelectorAll('.card')).forEach(item => {
        item.addEventListener('click', flipCard)
    })
}

export {renderCards}
