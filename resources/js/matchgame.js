var MatchGame = {};

$(document).ready(function() {
  let cardValues = MatchGame.generateCardValues();
  MatchGame.renderCards(cardValues);
});

//Generates random array of card values, ordered

MatchGame.generateCardValues = function () {
  let orderedArray = [];
  let cardArray = [];
  for (var i=1; i<9; i++) {
    orderedArray.push(i, i);
  }
  while (orderedArray.length > 0) {
    random = Math.floor(Math.random() * orderedArray.length);
    cardArray.push(orderedArray[random]);
    orderedArray.splice(random, 1);
  }
  return cardArray;
};

//render the cards (creating board)
MatchGame.renderCards = function(cardArray) {
  const colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  //empty the "game" div, add data element tracking fipped cards
  $("#game").empty();
  $("#game").data("flippedCards", []);

  //for loop to create all cards
  for (var i=0; i < cardArray.length; i++) {
    //create data object with information about card
    let value = cardArray[i];
    let color = colors[value -1]
    let data = {
      value: value,
      color: color,
      flipped: false
    };

    //create the card element, add the data
    let thisCard = $('<div class="card"></div>');
    thisCard.data(data);

    //add the card element to the "game" div
    $("#game").append(thisCard);
  }

  //when a card is clicked, apply the flipcard function
  $(".card").click(function() {
    MatchGame.flipCard($(this), $("#game"));
  });
};


//flips card, deals with game logic

MatchGame.flipCard = function(card, game) {
  
  //if the card is already flipped, do nothing
  if (card.data('flipped')) {
    return;
  }
  
  //assign the value and background-color to card, then added flipped=true to data
  card.css('background-color', card.data('color'))
    .text(card.data('value'))
    .data('flipped', true);

  //push card to 'game' data array
  let flippedCards = game.data('flippedCards');
  flippedCards.push(card);

  //checking if there are two flipped cards (in game data)
  if (flippedCards.length == 2) {
    
    //if they have the same value, grey them out
    if (flippedCards[0].data('value') == flippedCards[1].data('value')) {
      let matchedCss = {
        'background-color': 'rgb(153, 153, 153)',
        color: 'rgb(204,204,204)',
        opacity: '0.2'
      };
      flippedCards[0].css(matchedCss);
      flippedCards[1].css(matchedCss);
    }
    
    //otherwise, return them to 'face-down' position
    else {
      window.setTimeout(function () {
        flippedCards[0].css('background-color', 'rgb(32,64,86)')
          .text('')
          .data('flipped', false);
        flippedCards[1].css('background-color', 'rgb(32,64,86)')
          .text('')
          .data('flipped', false);
      }, 500);
    }

    //reset the game data array
    game.data('flippedCards', []);
  }
};