
function Player(){
  this.name = 'Lance'; //prompt('What\'s your name?');
  this.hand = [];
  this.defaultBet = 10;
  this.stack = 100;
  $('#playerName').innerHTML = this.name;
}

function Dealer(){
  this.deck = createDeck();
  this.hand = [];
  this.name = 'Dealer';
}

//in: nothing. process: creates 2 Hand objects. Displays dealers first card and player's cards. out: nothing.
function deal(){
  dealer.hand = new Hand(dealer,'deal');
  updateHand(dealer.hand);
  dealer.hand.cards.push(selectCard()[0]);
  player.hand = new Hand(player);
  updateHand(player.hand,"players-cards");
}

//constructor for hand creates a 2 card hand and assigns it to a player
function Hand(actor, handType) {
    switch (handType) {
      case 'deal':
        this.cards = [selectCard()[0]];
        this.cardSlot = addCardSlot(actor);
        break;
      case 'split':
        this.split1 = [actor.hand.cards[0], selectCard()[0]];
        this.split2 = [actor.hand.cards[1], selectCard()[0]];
        this.cardSlot = addCardSlot(actor);
        this.bet = actor.hand.bet;
        break;
      default:
        this.cards = [selectCard()[0],selectCard()[0]];
        this.cardSlot = addCardSlot(actor);
        this.bet = actor.defaultBet;
    };
}


//in: hand. process: double bet, hits hand, and starts dealer. out: nothing.
function doubleDown(hand){
  hand.bet *= 2;
  player.hand.cards.push(selectCard()[0]);
  updateHand(player.hand,"players-cards");
  dealerTurn();
}

//in: hand. process: adds card to hand, updates dom, and checks for bust. out: nothing.
function hit(hand){
    player.hand.cards.push(selectCard()[0]);
    updateHand(player.hand,"players-cards");
    if(cardValue(player.hand)==="BUST"){
      alert("BUST");
      clearTable(false,1);
    }
}

function split(actor){
  var firstSplit = actor.hand.cards[0];
  var secondSplit = actor.hand.cards[1];
  actor.hand[0] = new Hand (actor,firstSplit);
  actor.hand[1] = new Hand (actor,secondSplit);
  updateHand(player.hand,"players-cards");
}
