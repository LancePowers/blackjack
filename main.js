  var player = new Player();
  var dealer = new Dealer();




//in: - process: prompt player name and change text. out: -
function Player(){
  this.name = prompt('What\'s your name?');
  this.hand = [];
  this.count = 0;
  this.stack = 100;
  document.getElementById('playerName').innerHTML = this.name;
}
function Dealer(){
  this.deck = createDeck();
  this.hand = [];
  this.count = 0;
}




//in: nothing. process: creates a new deck when the old one has less than 10 cards. prompts for bet, creates hands, and checks for blackjack out: nothing.
function newRound(){
  if(dealer.deck.length < 10){
    dealer.deck = createDeck();
    alert("Shuffling");
  }
  dealer.hand = new Hand();
  dealer.count = updateHand(dealer,"dealers-cards");

  player.hand = new Hand();
  player.count = updateHand(player,"players-cards");
  player.count = updateHand(player,"players-cards");

  updateChips();

// Need some ideas for refactoring the check blackjack
  if(checkBlackjack(player.hand) === true){
    alert("You got Blackjack!");
    clearTable(true,1.5);
  }
  if(checkBlackjack(dealer.hand) === true){
    alert("Dealer Blackjack!");
   clearTable(false,1);
  }
}

//in: hand. process: double bet, hits hand, and starts dealer. out: nothing.
function doubleDown(hand){
  bet *= 2;
  player.hand.cards.push(selectCard()[0]);
  player.count = updateHand(player,"players-cards");
  dealerTurn();
}

//in: hand. process: adds card to hand, updates dom, and checks for bust. out: nothing.
function hit(hand){
    player.hand.cards.push(selectCard()[0]);
    player.count = updateHand(player,"players-cards");
    if(cardValue(player.hand)==="BUST"){
      alert("BUST");
      clearTable(false,1);
    }
}

//in: nothing. process: hits dealer hand untill soft 17 or bust. out: nothing.
function dealerTurn(){
  dealerCount = updateHand(dealer,"dealers-cards");
  while (cardValue(dealer.hand)<17){
    dealer.hand.cards.push(selectCard()[0]);
    dealerCount = updateHand(dealer,"dealers-cards");
  }
  winLose();
}

//in: nothing. process: compares hands to determine win or lose. out: nothing.
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
    clearTable(true,1)
  }

}

//in: win or lose boolean, multiplier for bet amount(*1.5 for BJ 0 for push). process: update bet add or subtract from stack. out: nothing.
function clearTable(win,multiplier){
  player.bet *= multiplier;
  if(win === true){
    player.stack += player.bet;
  } else {
    player.stack -= player.bet;
  }
  wipe();
  updateChips();
}




//split


