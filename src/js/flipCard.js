//handles flip-card logic
function flipCard () {

    const game = document.querySelector('.card-container')
    const button = document.querySelector('button')

    //if the card is already flipped, do nothing
    if (this.classList.contains('flipped')) {
        return
    }

    //assign the value and background-color to card, then add class of 'flipped'
    this.style.backgroundColor = `${this.getAttribute('color')}`
    this.innerHTML = `${this.getAttribute('value')}`
    this.classList.add('flipped')

    //check if there are two flipped cards
    const flippedCards = document.querySelectorAll('.flipped')
    if (flippedCards.length === 2) {

        //if the two cards have the same value, grey them out
        if (flippedCards[0].getAttribute('value') === flippedCards[1].getAttribute('value')) {

          flippedCards.forEach(card => {

            Object.assign(card.style, {
                'background-color': 'rgb(153,153,153)',
                'color': 'rgb(204,204,204)',
                'opacity': '0.2'
            })
          })

          //add to countFlipped (tracking matched pairs)
          let count = window.localStorage.getItem('count')

          !count
            ? count = 1
            : count++

          window.localStorage.setItem('count', count)

          //then remove the class of 'flipped'
          flippedCards[0].classList.remove('flipped')
          flippedCards[1].classList.remove('flipped')

          //once countFlipped reaches 8, end the game by fading out
          if (count === 8) {
            console.log('game-ending')

            game.classList.add('end')

            game.addEventListener('transitionend', clear)

            function clear () {
              //empty cards
              while(game.firstChild) {
                game.removeChild(game.firstChild)
              }

              //display play-again button
              game.innerHTML = 'Well Done!'
              game.classList.add('well-done')
              button.classList.add('active')
            }
          }
        }

        //if cards don't have the same value, return them to 'face-down' position
        else {
            setTimeout(function() {
                flippedCards[0].style.backgroundColor = 'rgb(32,64,86)'
                flippedCards[0].innerHTML = ''
                flippedCards[0].classList.remove('flipped')

                flippedCards[1].style.backgroundColor = 'rgb(32,64,86)'
                flippedCards[1].innerHTML = ''
                flippedCards[1].classList.remove('flipped')
            }, 400)
        }
    }
}

export {flipCard}
