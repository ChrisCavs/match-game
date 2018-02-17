MatchGame.renderCards = function (cardArray) {

    //return to default css on card-container + play-again button
    const game = document.querySelector('#game');
    const button = document.querySelector('#button');
    Object.assign(game.style, {
        'justify-content': 'space-between',
        'margin-top': '1rem',
        'margin-bottom': '2rem'
    });
    button.style.opacity = '0';

    //set colors for backs of cards
    const colors = [
        'hsl(25, 85%, 65%)',
        'hsl(55, 85%, 65%)',
        'hsl(90, 85%, 65%)',
        'hsl(160, 85%, 65%)',
        'hsl(220, 85%, 65%)',
        'hsl(265, 85%, 65%)',
        'hsl(310, 85%, 65%)',
        'hsl(360, 85%, 65%)'];

    //empty the game div, add keys to global object tracking flipped cards + number of pairs flipped
    while (game.firstChild) {
        game.removeChild(game.firstChild);
    };
    MatchGame.flippedCards = [];
    MatchGame.countFlipped = 0;

    //for loop to create all cards
    for (var i = 0; i < cardArray.length; i++) {
        //create data object with info about card
        let value = cardArray[i];
        let color = colors[value-1]
        let flipped = false;

        //create the card element, add the data
        let thisCard = document.createElement('div');
        thisCard.classList.add('card');
        thisCard.setAttribute('value', value);
        thisCard.setAttribute('color', color);
        thisCard.setAttribute('flipped', 'false');

        //add card to game div
        game.appendChild(thisCard);
    }

    //when card is clicked, apply flipcard function
    Array.from(document.querySelectorAll('.card')).forEach(item => {
        item.addEventListener('click', MatchGame.flipCard);
    })
}
