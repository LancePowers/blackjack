
Player = function(){
  this.name = 'Lance'; //prompt('What\'s your name?');
  this.hands = [];
  this.currentBet = 10;
  this.stack = 100;
  this.spot = $("<div class = 'margin-left'></div>").attr('id',this.name);
}




//I: P: O:
Player.prototype.pay = function(win, bet){
  if(win === true){
    this.stack += bet;
  } else {
    this.stack -= bet;
  }
}

//I: P: O:
Player.prototype.hit = function(){
  this.hands[0].cards.push(blackJack.selectCard()[0]);
  this.updateCards();
  this.cardValue();
}

//I: P: O:
Player.prototype.double = function(){
  this.hand.bet *= 2;
  player.hand.cards.push(selectCard()[0]);
  this.updateCards();
}

//I: P: O: -verified
Player.prototype.stay = function(){
  blackJack.activeHands.push(this.hands.splice(0,1)); //push the hand to activeHands for later
  if(this.hands.length === 0){ //if it's the last hand for the player
    blackJack.activePlayer++; // make the player inactive
    if(blackJack.activePlayer === blackJack.players.length){ //if it's the last active player
      blackJack.dealerTurn(); //start the dealers turn.
    }
  }
}

Player.prototype.split = function(){
  var bet = this.hands[0].bet;
  var card1 = this.hands[0].cards[0];
  var card2 = this.hands[0].cards[1];
  this.hands[0] = new Hand ('single',bet);
  this.hands[1] = new Hand ('single',bet);
  this.hands[0].cards.push(card1);
  this.hands[1].cards.push(card2);
}



// 2 cards dealt to players 1 card to dealer
// player can hit stay double or split
