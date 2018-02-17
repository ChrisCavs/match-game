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
