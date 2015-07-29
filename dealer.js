//in: nothing. process: creates 2 Hand objects. Displays dealers first card and player's cards. out: nothing.
function deal(){
  dealer.hand = new Hand(dealer);
  updateHand(dealer.hand,true);
  player.hand = new Hand(player);
  updateHand(player.hand,"players-cards");
}


function Dealer(){
  this.deck = createDeck();
  this.hand = [];
  this.name = 'Dealer';
}

//constructor for hand creates a 2 card hand and assigns it to a player
function Hand(actor, firstCard) {
    if(firstCard === undefined){firstCard = selectCard()[0];}
    this.cards = [firstCard, selectCard()[0]];
    if(actor !== dealer) { this.bet = actor.defaultBet; }
    this.playerName = actor.name;
    this.cardSlot = addCardSlot(playerName);
}
