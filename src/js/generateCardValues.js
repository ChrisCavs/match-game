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
