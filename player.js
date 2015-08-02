
Player = function(){
  this.name = 'Lance'; //prompt('What\'s your name?');
  this.hands = [];
  this.handValues = [];
  this.currentBet = 10;
  this.stack = 100;
  this.spot = $("<div></div>").attr('id',this.name);
}


//I: P: O:
Player.prototype.cardValue = function(){
  var handValue = 0;
  for (var i = 0; i < this.hands[0].cards.length; i++) {
    handValue += this.hands[0].cards[i].value;
  }
  while(this.hands[0].softCheck()[0] === 'soft' && handValue < 17){
    this.hands[0].aceConvert();
  }
  if(handValue > 21) {
    handValue = 'BUST';
  }
  return  handValue;
}

//I: P: O:
Player.prototype.pay = function(win,multiplier){
  var winnings = this.handValue[0].bet *= multiplier;
  if(win === true){
    player.stack += winnings;
  } else {
    player.stack -= this.handValue[0].bet;
  }
}

//I: P: O:
Player.prototype.hit = function(){
this.hands[0].cards.push(blackJack.selectCard()[0]);
this.updateCards();
if(this.cardValue()==="BUST"){
  blackJack.alertResults("playerBust");
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
