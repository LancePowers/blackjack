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
  this.dealerFinalValue;
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
  this.clearHands();
  this.shuffle();
  this.activatePlayers();
  this.dealerHand = new Hand('single');
  this.dealPlayers();
  this.dealDealer();
}

Game.prototype.clearHands = function(){
  this.activePlayers.splice(0);
}

Game.prototype.dealDealer = function () {
  $('#dealers-cards').html("");
  $('#dealers-cards').append(this.dealerHand.cards[0].image);
  this.dealerHand.cards.push( this.selectCard()[0] );
  if (this.dealerHand.checkBlackjack() === true){
    this.alertResults('dealerBJ');
    while (this.activePlayers.length){
        this.activePlayers[0].pay(false);
        this.nextRound();
    };
  };
}

Game.prototype.dealPlayers = function(){
  for (var i = 0; i < this.activePlayers.length; i++) {
    this.activePlayers[i].hands[0] = new Hand("",this.activePlayers[i].currentBet);
    this.activePlayers[i].updateCards();
    var bJTest = this.activePlayers[i].hands[0].checkBlackjack();
    if(bJTest === true){
      this.activePlayers[i].hands[0].bet *= 1.5;
      this.activePlayers[i].hands.splice(0,1);
      this.activePlayers[i].pay(true);
      this.alertResults('playerBJ');
    }
  }
}
Game.prototype.activatePlayers = function(){
  for (var i = 0; i < this.players.length; i++) {
    var slicedPlayer = this.players.slice(i,1);
    this.activePlayers.push(slicedPlayer[0]);
  }
}

//I: - P: adds a card to the dealers hand while it's less than 17  O: -
Game.prototype.dealerTurn = function(){
  $('#dealers-cards').append(this.dealerHand.cards[1].image);
  var cardCount = 2
  while (this.dealerValue()<17){
    var tempCard = this.selectCard();
    this.dealerHand.cards.push( tempCard[0] );
    $('#dealers-cards').append(this.dealerHand.cards[cardCount].image);
    cardCount++;
  }
  this.dealerFinalValue = this.dealerValue();
  this.winLose();
}

Game.prototype.dealerValue = function(){
  var handValue = this.dealerHand.handValue();
  while(this.dealerHand.softCheck()[0] === 'soft' && handValue < 17){
    this.delearHand.aceConvert();
  }
  if(handValue > 21) {
    blackJack.alertResults('dealerBust');
    this.dealerFinalValue = 0;
  }
  return  handValue;
}

//i - p: transfer hand to player's hand value array. removes player as active. starts dealer turn if no more active players. O -
//May need to refactor this.
Game.prototype.nextRound = function(){
  var player = this.activePlayers[0];
  var hand = player.hands[0];
  player.handValues.push(player.hands.splice(0,1));
  if(player.hands.length === 0){
    this.activePlayers.splice(0,1);
  }
  if(this.activePlayers.length === 0){
    this.dealerTurn();
  }
}

Game.prototype.winLose = function(){
  for (var i = 0; i < this.activePlayers.length; i++) {
    if(this.activePlayers.hands !== undefined){
    for(var i = 0; i < this.activePlayers.hands.length; i++){
    if (this.activePlayers[0].handValues[0] > dealerFinalValue){
      this.activePlayers[0].pay(true);
    } else {
    this.activePlayers[0].pay(false);
    }
   this.nextRound();
    }
   }
  }
}

//determine who won
//add or subtract chips.
