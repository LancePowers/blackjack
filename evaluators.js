//in: hand. process: see if the value of a hand = 21. out: true or false
function checkBlackjack(){
  if((player.hand.cards[0].value + player.hand.cards[1].value) === 21){
    alert("You got Blackjack!");
    clearTable(true,1.5);
  }
  if((dealer.hand.cards[0].value + dealer.hand.cards[1].value) === 21){
    updateHand(dealer,"dealers-cards");
    alert("Dealer Blackjack!");
   clearTable(false,1);
  }
  updateChips();
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
  if(hand.name === 'Dealer'){handValue = dealerValue(hand,handValue);}
  else {handValue = playerValue(hand,handValue);}
  return handValue;
}

function dealerValue(hand,handValue){
  if(softCheck(hand)[0] === 'soft' && handValue < 17){
    hand = aceConvert(hand);
    cardValue(hand);
  } else if (handValue > 21) {
    return 'BUST';
  } else {
    return handValue;
  }
}

function playerValue(hand,handValue){
  if(handValue > 21){
  if(softCheck(hand)[0] === 'soft'){
    hand = aceConvert(hand);
    cardValue(hand);
  } else {handValue = 'BUST';}
  }
  return handValue;
}
//in: hand. process: change ace value from 11 to 1. out: nothing(updates global.)
function aceConvert (hand) {
  var aceAt = softCheck(hand)[1];
  hand.cards[aceAt].value = 1;
  return hand;
}

//in: nothing. process: compares hands to determine win or lose, calls clear tabel and update chips. out: nothing.
function winLose(){
  if(cardValue(dealer.hand)==="Bust"){
    alert("Dealer Busts");
    clearTable(true,1);
  }  else if(cardValue(dealer.hand)>cardValue(player.hand)){
    alert("you lose");
    clearTable(false,1);
  } else if (cardValue(dealer.hand)===cardValue(player.hand)){
    alert("push");
    clearTable(true,0);
  } else {
    alert("you win!");
    clearTable(true,1);
  }
  updateChips();
}
//in: the amount to change bet P: validates bet and alerts if not valid out: the validated change amount
function checkBet(checkBet,stack){
  if(((stack -= checkBet) < 0) || (checkBet > stack)){
    alert('Unfortunately, you can\'t afford that bet.');
  } else {
    return checkBet;
  }
}


