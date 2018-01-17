let MatchGame = {};

document.addEventListener('DOMContentLoaded', function () {
    MatchGame.renderCards(MatchGame.generateCardValues());
});

//Generates random array of card values, ordered
MatchGame.generateCardValues = function () {
	
    let orderedArray = [];
    let cardArray = [];
    for (var i = 1; i < 9; i++) {
        orderedArray.push(i, i);
    };
    
    while (orderedArray.length > 0) {
        let random = Math.floor(Math.random() * orderedArray.length);
        cardArray.push(orderedArray[random]);
        orderedArray.splice(random, 1);
    }
    return cardArray; //ex: [2,4,1,8,3,3,1....]
};

//Render the cards (creating board)
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

MatchGame.flipCard = function () {

    const game = document.querySelector('#game');
    const button = document.querySelector('#button');
    
    //if the card is already flipped, do nothing
    if (this.classList.contains('flipped')) {
        return;
    }
    
    //assign the value and background-color to card, then add class of 'flipped'
    this.style.backgroundColor = `${this.getAttribute('color')}`;
    this.innerHTML = `${this.getAttribute('value')}`;
    this.classList.add('flipped');
        
    //check if there are two flipped cards
    if (document.querySelectorAll('.flipped').length == 2) {

		card1 = document.querySelectorAll('.flipped')[0];
		card2 = document.querySelectorAll('.flipped')[1];
        
        //if the two cards have the same value, grey them out
        if (card1.getAttribute('value') == card2.getAttribute('value')) {
            Object.assign(card1.style, {
                'background-color': 'rgb(153,153,153)',
                'color': 'rgb(204,204,204)',
                'opacity': '0.2'
            });
            Object.assign(card2.style, {
                'background-color': 'rgb(153,153,153)',
                'color': 'rgb(204,204,204)',
                'opacity': '0.2'
            });
            
            //add to countFlipped (tracking matched pairs)
            MatchGame.countFlipped++;

            //then remove the class of 'flipped'
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            
            //once countFlipped reaches 8, end the game by fading out
            if (MatchGame.countFlipped == 8) {
                
                let opacity = 100;
                let startStop = setInterval(function () {
                    
                    //once faded, change game contents
                    if (opacity == 0) {
                        clearInterval(startStop);
                        while(game.firstChild) {
                            game.removeChild(game.firstChild);
                        };
                        game.innerHTML = 'Well Done!';
                        Object.assign(game.style, {
                            'font-size': '2rem',
                            'justify-content': 'center',
                            'font-weight': '700',
                            'margin-top': '4rem',
                            'margin-bottom': '4rem'
                        });
                        
                        //fade-in
                        let startStop2 = setInterval(function () {
                            if (opacity == 100) {
                                clearInterval(startStop2)
                                
                                MatchGame.countFlipped = 0;
                            } else {
                                opacity++;
                                game.style.opacity = `${opacity*.01}`;
                                button.style.opacity = `${opacity*.01}`;
                            }
                        }, 7);
                    }
                    
                    //the initial fade-out
                    else {
                        opacity--;
                        game.style.opacity = `${opacity*.01}`;
                    }
                }, 7);
            }
        }
        
        //if they don't have the same value, return them to 'face-down' position
        else {
            setTimeout(function() {
                card1.style.backgroundColor = 'rgb(32,64,86)';
                card1.innerHTML = '';
                card1.classList.remove('flipped');
                
                card2.style.backgroundColor = 'rgb(32,64,86)';
                card2.innerHTML = '';
                card2.classList.remove('flipped');
            }, 400);
        }
    }
};
