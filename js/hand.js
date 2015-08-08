//I: type and bet P: creates a hand based upon hand type O:
function Hand(handType,defaultBet) {
    if (handType === 'single') {
      this.cards = [blackJack.selectCard()[0]]
    } else {
        this.cards = [blackJack.selectCard()[0],blackJack.selectCard()[0]];
        this.bet = defaultBet;
    };
}

Hand.prototype = new Player;
//I: - P: checks for black jack O: true or false

Hand.prototype.cardValue = function(){
  if(this.handValue > 21){
  if(this.softCheck()[0] === 'soft'){
    this.aceConvert();
    this.cardValue();
  } else {
    blackJack.alertResults('playerBust')}
    this.pay(false,this.bet);
    blackJack.nextRound();
  }
  return handValue;
}

Hand.prototype.checkBlackjack = function(){//WORKING
  if((this.cards[0].value + this.cards[1].value) === 21){
    return true;
  } else {
    return false;
  }
}

//I: - P: checks to see if a hand has an ace O: soft or hard, the position of the ace
Hand.prototype.softCheck = function(){//WORKING
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
Hand.prototype.aceConvert = function() {//WORKING
  var aceAt = this.softCheck()[1];
  this.cards[aceAt].value = 1;
}

//I: - P: add the values of the cards in a hand O: the value of the cards.
Hand.prototype.handValue = function(){//WORKING
  var handValue = 0;
  for (var i = 0; i < this.cards.length; i++) {
    handValue += this.cards[i].value;
  }
  return handValue;
}


/// testing
var ace = new Card ('ace_of_clubs.svg',11,'ace_of_clubs.svg');
var ten = new Card ('10_of_clubs.svg',10,'10_of_clubs.svg');
var three = new Card('3_of_clubs.svg',3,'3_of_clubs.svg')

function testHand(card1,card2){
  this.dummyHand = new Hand();
  dummyHand.cards[0] = card1;
  dummyHand.cards[1] = card2;
  return dummyHand;
}

var softTest = testHand(ace,three);
var hardTest = testHand(ten,ten);
var bjTest = testHand(ten,ace);
