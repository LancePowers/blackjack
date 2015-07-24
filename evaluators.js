//in: hand. process: see if the value of a hand = 21. out: true or false
function checkBlackjack(hand){
  if ((hand.cards[0].value + hand.cards[1].value) === 21) {
    return true;
  }
}

//in: hand. process: checks to see if a hand has an ace. out: 'soft or hard' and position of ace.
function softCheck(hand){
  var softHard = 'hard';
  var aceAt;
  for (var i = 0; i < hand.cards.length; i++) {
    if(hand.cards[i].value === 11){
      softHard = 'soft';
      aceAt = i;
    }
  }
  return [softHard, aceAt];
}

//in: hand. process: determine the card value of a player or dealer. out: hand value.
function cardValue(hand){
  //get initial hand value
  var handValue = 0;
  for (var i = 0; i < hand.cards.length; i++) {
    handValue += hand.cards[i].value;
  }
  // hand values for dealer.
  if(hand.name === 'Dealer'){
   if(softCheck(hand)[0] === 'soft' && handValue < 17){
      hand = aceConvert(hand);
      cardValue(hand);
    } else if (handValue > 21) {
      return 'BUST';
    } else {
      return handValue;
    }
  }
  //hand values for players
  if(handValue > 21){
    if(softCheck(hand)[0] === 'soft'){
      hand = aceConvert(hand);
      cardValue(hand);
    } else {handValue = 'BUST';
    }
  }
  return handValue;
}

//in: hand. process: change ace value from 11 to 1. out: nothing(updates global.)
function aceConvert (hand) {
  var aceAt = softCheck(hand)[1];
      hand.cards[aceAt].value = 1;
}

//in: hand, number of cards in hand, and dom id. process: add a card image to html and update # of cards. out: new # of cards.
function updateHand(player,cardslot){
  var num = player.count;
  var image = player.hand.cards[num].image;
  addElement(image,cardslot);
  num++;
  return num;
}
