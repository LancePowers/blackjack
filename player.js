
function Player(){
  this.name = 'Lance'; //prompt('What\'s your name?');
  this.hand = [];
  this.defaultBet = 10;
  this.stack = 100;
  document.getElementById('playerName').innerHTML = this.name;
}




//in: hand. process: double bet, hits hand, and starts dealer. out: nothing.
function doubleDown(hand){
  hand.bet *= 2;
  player.hand.cards.push(selectCard()[0]);
  updateHand(player,"players-cards");
  dealerTurn();
}

//in: hand. process: adds card to hand, updates dom, and checks for bust. out: nothing.
function hit(hand){
    player.hand.cards.push(selectCard()[0]);
    updateHand(player,"players-cards");
    if(cardValue(player.hand)==="BUST"){
      alert("BUST");
      clearTable(false,1);
    }
}

function split(actor){
  var firstSplit = actor.hand.cards[0];
  var secondSplit = actor.hand.cards[0];
  actor.hand[0] = new Hand (actor,firstSplit);
  actor.hand[1] = new Hand (actor,secondSplit);
}
