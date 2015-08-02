//var playerCount = prompt('How many players do we have?')
var blackJack = new Game(1);



//I: Count  P: Creates new game object with deck and players O: -
function Game(count){
  this.players= [];
  for (var i = 0; i < count; i++) {
    this.players.push( new Player());
    $('#player-area').append(this.players[i].spot);
  }
  this.activePlayers = [];
  this.deck = createDeck();
  this.dealerHand;

}

//I: -  P: Chooses a card from the deck at random O: card
Game.prototype.selectCard = function (){
  var cardPos = Math.floor(Math.random() * this.deck.length);
  var card = this.deck.splice(cardPos, 1);
  return card;
}

//I:- P: Creates a new deck if current has less than 10 cards O: -
Game.prototype.shuffle = function(){
  if(this.deck.length < 10){
    this.deck = createDeck();
    alert("Shuffling");
  }
}

//I: - P: Adds players to active player array and deals them cards. Deals 1 card for the dealer O: -
Game.prototype.deal = function(){
  this.shuffle();
  for (var i = 0; i < this.players.length; i++) {
    var slicedPlayer = this.players.slice(i,1);
    this.activePlayers.push(slicedPlayer[0]);
  }
  for (var i = 0; i < this.activePlayers.length; i++) {
    this.activePlayers[i].hands[0] = new Hand("",this.activePlayers[i].currentBet);
    this.activePlayers[i].updateCards();
  }
  this.dealerHand = new Hand('single');
    $('#dealers-cards').append(this.dealerHand.cards[0].image);
}



//I: - P: adds a card to the dealers hand while it's less than 17  O: -
Game.prototype.dealerTurn = function(){
  var cardCount = 1
  while (this.dealerValue(this.dealerHand)<17){
    var tempCard = selectCard();
    this.dealerHand.cards.push( tempCard[0] );
    $('#dealers-cards').append(this.dealerHand.cards[cardCount].image);
    cardCount++;
  }
}

Game.prototype.checkBJ = function(){

}

Game.prototype.dealerValue = function(hand,handValue){
  if(handValue > 21){
  if(softCheck(hand)[0] === 'soft'){
    hand = aceConvert(hand);
    cardValue(hand);
  } else {handValue = 'BUST';}
  }
  return handValue;
}

Game.prototype.winLose = function(){
  if(dealer.cardValue()==="Bust"){
    console.log("Dealer Busts");
  }  else if(dealer.cardValue()>this.cardValue){ ///<<<------ this won't work. It needs to be local to the hand for splitting.
  /// W if hands was an array with an active hand. split creates another hand in reserve
  ///(index 0 starts first. while loop for while the player still has a hand left)
    console.log("you lose");
  } else if (dealer.cardValue()===this.cardValue){
    console.log("push");
  } else {
    console.log("you win!");
  }
  updateChips();
}
