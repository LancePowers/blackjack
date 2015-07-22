  var stack = 100;
  var bet = 0;
  var deck = [];
  var player = newPlayer();
  var playerHand;
  var playerCount=0;
  var dealerCount=0;
  createDeck();


//in: - process: prompt player name and change text. out: -
function newPlayer(){
  var p1name = prompt('What\'s your name?');
  document.getElementById('playerName').innerHTML = p1name;
}

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
  //reduce hand value by 10
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
function updateHand(player, count, cardslot){
  var image = player.cards[count].image;
  addElement(image,cardslot);
  count++;
  return count;
}



//in: nothing. process: creates a new deck when the old one has less than 10 cards. prompts for bet, creates hands, and checks for blackjack out: nothing.
function newRound(){
  if(deck.length < 10){
    createDeck();
    alert("Shuffling");
  }

  bet = parseInt(prompt("How much would you like to bet?"));
  updateChips();
  playerCount = 0;
  dealerCount = 0;
  playerHand = new Hand('lance');
  dealerHand = new Hand('Dealer');


  playerCount = updateHand(playerHand,playerCount,"players-cards");
  playerCount = updateHand(playerHand,playerCount,"players-cards");

  dealerCount = updateHand(dealerHand,dealerCount,"dealers-cards");

  if(checkBlackjack(playerHand) === true){
    alert("You got Blackjack!");
    clearTable(true,1.5);
  }
  if(checkBlackjack(dealerHand) === true){
    alert("Dealer Blackjack!");
   clearTable(false,1);
  }
}

//in: win or lose boolean, multiplier for bet amount(*1.5 for BJ 0 for push). process: update bet add or subtract from stack. out: nothing.
function clearTable(win,multiplier){
  bet *= multiplier;
  if(win === true){
    stack += bet;
  } else {
    stack -= bet;
  }
  wipe();
  updateChips();
  bet = 0;
}

//in: hand. process: double bet, hits hand, and starts dealer. out: nothing.
function doubleDown(hand){
  bet *= 2;
  playerHand.cards.push(selectCard()[0]);
  playerCount = updateHand(playerHand, playerCount,"players-cards");
  dealerTurn();
}

//in: hand. process: adds card to hand, updates dom, and checks for bust. out: nothing.
function hit(hand){
    playerHand.cards.push(selectCard()[0]);
    playerCount = updateHand(playerHand, playerCount,"players-cards");
    if(cardValue(playerHand)==="BUST"){
      alert("BUST");
      clearTable(false,1);
    }
}

//in: nothing. process: hits dealer hand untill soft 17 or bust. out: nothing.
function dealerTurn(){
  dealerCount = updateHand(dealerHand, dealerCount,"dealers-cards");
  while (cardValue(dealerHand)<17){
    dealerHand.cards.push(selectCard()[0]);
    dealerCount = updateHand(dealerHand, dealerCount,"dealers-cards");
  }
  winLose();
}

//in: nothing. process: compares hands to determine win or lose. out: nothing.
function winLose(){
  if(cardValue(dealerHand)==="Bust"){
    alert("Dealer Busts");
    clearTable(true,1);
  }  else if(cardValue(dealerHand)>cardValue(playerHand)){
    alert("you lose");
    clearTable(false,1);
  } else if (cardValue(dealerHand)===cardValue(playerHand)){
    alert("push");
    clearTable(true,0);
  } else {
    alert("you win!");
    clearTable(true,1)
  }

}






//split


