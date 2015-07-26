  var player = new Player();
  var dealer = new Dealer();


//in: nothing. process: creates a new deck when the old one has less than 10 cards. prompts for bet, creates hands, and checks for blackjack out: nothing.
function newRound(){
  if(dealer.deck.length < 10){
    dealer.deck = createDeck();
    alert("Shuffling");
  }
  deal();
  updateChips();
  checkBlackjack();
}



//in: nothing. process: hits dealer hand untill soft 17 or bust. out: nothing.
function dealerTurn(){
  updateHand(dealer,"dealers-cards");
  while (cardValue(dealer.hand)<17){
    dealer.hand.cards.push(selectCard()[0]);
    updateHand(dealer,"dealers-cards");
  }
  winLose();
}



//in: win or lose boolean, multiplier for bet amount(*1.5 for BJ 0 for push). process: update bet add or subtract from stack. out: nothing.
function clearTable(win,multiplier){
  var winnings = player.hand.bet *= multiplier;
  if(win === true){
    player.stack += winnings;
  } else {
    player.stack -= player.hand.bet;
  }
  wipe("dealers-cards");
  wipe("players-cards");
}




//split


