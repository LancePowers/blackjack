//I: type and bet P: creates a hand based upon hand type O:
function Hand(handType,defaultBet) {
    if (handType === 'single') {
      this.cards = [blackJack.selectCard()[0]]
    } else {
        this.cards = [blackJack.selectCard()[0],blackJack.selectCard()[0]];
        this.bet = defaultBet;
    };
}
//I: - P: checks for black jack O: true or false
Hand.prototype.checkBlackjack = function(){
  if((this.cards[0].value + this.cards[1].value) === 21){
    return true;
  } else {
    return false;
  }
}

//I: - P: checks to see if a hand has an ace O: soft or hard, the position of the ace
Hand.prototype.softCheck = function(){
  var softHard = 'hard';
  var aceAt;
  for (var i = 0; i < this.cards.length; i++) {
    if(this.cards[i].value === 11){
      softHard = 'soft';
      aceAt = i;
    }
  }
  return [softHard, aceAt];
}

//I: - P: changes and ace to value of 1 O: -
Hand.prototype.aceConvert = function() {
  var aceAt = this.softCheck()[1];
  this.cards[aceAt].value = 1;
}

Hand.prototype.split = function () {

};

// both
// game has players
// players have hands
// players have stacks
// player should bet
// game should payout
// game .score this.player[0].hand vs this.dealer.hand
// game .payout winning player.stack = bet * multiplier.
// game .deal
// hands have cards
//Hand.prototype.softCheck = function(){}
//Hand.prototype.value = function(){}
//Hand.prototype.checkBlackjack(){}
//Hand.prototype.aceConvert(){}
