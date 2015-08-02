
Player = function(){
  this.name = 'Lance'; //prompt('What\'s your name?');
  this.hands = [];
  this.handValues = [];
  this.currentBet = 10;
  this.stack = 100;
  this.spot = $("<div class = 'margin-left'></div>").attr('id',this.name);
}


//I: P: O:
Player.prototype.cardValue = function(){
  var handValue = this.hands[0].handValue();
  if(handValue > 21){
  if(this.hands[0].softCheck()[0] === 'soft'){
    this.hands[0] = aceConvert(hand);
    this.cadrValue();
  } else {
    blackJack.alertResults('playerBust')}
    this.pay(false);
    blackJack.nextRound();
  }
  return handValue;
}


//I: P: O:
Player.prototype.pay = function(win){
  if(win === true){
    this.stack += this.hands[0].bet;
  } else {
    this.stack -= this.hands[0].bet;
  }
  this.hands[0].bet = 0;
}

//I: P: O:
Player.prototype.hit = function(){
this.hands[0].cards.push(blackJack.selectCard()[0]);
this.updateCards();
if(this.cardValue()==="BUST"){
  blackJack.alertResults("playerBust");
  blackJack.nextRound();
}
}

//I: P: O:
Player.prototype.double = function(){
this.hand.bet *= 2;
player.hand.cards.push(selectCard()[0]);
this.updateCards();
}

//I: P: O:
Player.prototype.stay = function(){
  var value = this.handValue
  if(this === blackJack.activePlayers[-1]){ //if this is the last player
    blackJack.dealerTurn();
  } else {
    blackJack.activePlayers.splice(this);
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
