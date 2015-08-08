var blackJack = new Game(1);
//I: Count  P: Creates new game object with deck and players O: -
function Game(count){
  this.players= [];
  for (var i = 0; i < count; i++) {
    this.players.push( new Player());
    $('#player-area').append(this.players[i].spot);
  }
  this.activePlayer = 0;
  this.activeHands = [];
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
    while (this.players.length){
        this.players[0].pay(false);
        this.nextRound();
    };
  };
}

Game.prototype.dealPlayers = function(){
  for (var i = 0; i < this.players.length; i++) {
    this.players[i].hands[0] = new Hand("",this.players[i].currentBet);
    this.players[i].updateCards();
    var bJTest = this.players[i].hands[0].checkBlackjack();
    if(bJTest === true){
      this.players[i].hands[0].bet *= 1.5;
      this.players[i].hands.splice(0,1);
      this.players[i].pay(true);
      this.alertResults('playerBJ');
    }
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
  var player = this.players[0];
  var hand = player.hands[0];
  this.activeHands.push(player.hands.splice(0,1));
  if(player.hands.length === 0){
    this.players.splice(0,1);
  }
  if(this.players.length === 0){
    this.dealerTurn();
  }
}

Game.prototype.winLose = function(){
  var playerFinalValue = this.activeHands[0].cardValue();
  for (var i = 0; i < this.activeHands.length; i++) {
    if(playerFinalValue > this.dealerFinalValue){
      this.alertResults('win');
    } else if (playerFinalValue < dealerFinalValue) {
      this.alertResults('lose');
    } else {
      this.alertResults('push')
    }
  }

}

//stop dealerTurn if player busts
