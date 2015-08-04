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
  this.dealerFinalValue = 0;
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
  this.activatePlayers();
  this.dealerHand = new Hand('single');
  this.dealPlayers();
  this.dealDealer();
  this.buttons(true);
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
  $('#dealers-cards').append(this.dealerHand.cards[1].image); //show the dealers down card
  var cardCount = 2 //update the position of the cards displayed
  while (this.dealerValue()<17){ //get the value of the hand and continue untill it is 17 or greater
    var tempCard = this.selectCard();//grab a card from the deck
    this.dealerHand.cards.push( tempCard[0] ); //add the card to the dealers hand
    $('#dealers-cards').append(this.dealerHand.cards[cardCount].image); //show the card on the table
    cardCount++; //increase the count of cards shown
  }
  this.dealerFinalValue = this.dealerValue(); //set a variable to compare other hands against.
  this.winLose(); //call the function to evaluate the hands
}

Game.prototype.dealerValue = function(){
  var handValue = this.dealerHand.handValue();
  while(this.dealerHand.softCheck()[0] === 'soft' && handValue < 17){
    this.dealerHand.aceConvert();
  }
  if(handValue > 21) {
    this.dealerFinalValue = 0;
    blackJack.alertResults('dealerBust');
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
  var playerFinalValue = this.players[0].handValues[0].cardValue()
  if(playerFinalValue > this.dealerFinalValue){
    this.alertResults('win');
  } else if (playerFinalValue < dealerFinalValue) {
    this.alertResults('lose');
  } else {
    this.alertResults('push')
  }

}

//stop dealerTurn if player busts
