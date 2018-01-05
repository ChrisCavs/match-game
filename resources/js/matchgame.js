var MatchGame = {};

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


MatchGame.renderCards = function(cardValues, $game) {
  const colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];

  $("#game").empty();
  $("#game").data("flippedCards", []);

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
    let $thisCard = $('<div class="card"></div>');
    $thisCard.data(data);

    //add the card element to the "game" div
    $("#game").append($thisCard);
  }

  //when the card is clicked, apply the flipcard function
  $(".card").click(function() {
    MatchGame.flipcard($(this), $("#game"));
  });
};


//Flips over a given card and checks to see if two cards are flipped over. Updates styles on flipped cards depending whether they are a match or not.

MatchGame.flipCard = function($card, $game) {
};