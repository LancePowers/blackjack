
//prompts user for name and creates 3 hands (2 player 1 dealer).
//Need to add ability to choose # of players
function newPlayer(){
  var p1name = prompt("What's your name?");
  document.getElementById("playerName").innerHTML = p1name;
}

//checks a hand for blackJack
function checkBlackjack(hand){
  if ((hand.cards[0].value + hand.cards[1].value) === 21) { return true; }
}

function softCheck(hand){
  var softHard = "hard";
  var aceAt;
  for (var i = 0; i < hand.cards.length; i++) {
    if(hand.cards[i].value === 11){
      softHard = "soft";
      aceAt = i;
    }
  }
  //reduce hand value by 10
  return [softHard, aceAt];
}

//function to determine value of a hand/if it's busted///
//STILL NEED TO FIGURE OUT SOFT HANDS
function cardValue(hand){
  //get initial hand value
  var handValue = 0;
  for (var i = 0; i < hand.cards.length; i++) {
    handValue += hand.cards[i].value;
  }
  // hand values for dealer.
  if(hand.name === "Dealer"){
    if(softCheck(hand)[0] === "soft" && handValue < 17){
      var aceAt = softCheck(hand)[1];
      hand.cards[aceAt].value = 1;
      cardValue(hand);
    } else if (handValue > 21) {
      stack -= (bet);
      wipe();
      updateChips();
      bet = 0;
    } else {
      return handValue;
    }
  }
  //hand values for players
  if(handValue > 21){
    if(softCheck(hand)[0] === "soft"){
      var aceAt = softCheck(hand)[1];
      hand.cards[aceAt].value = 1;
      cardValue(hand);
    } else {handValue = "BUST";
    }
  }
  return handValue;
}


// calls on the createElement function in dom.js to display cards.
function updateHand(player, count, cardslot){
  var image = player.cards[count].image;
  addElement(image,cardslot);
  count++;
  return count;
}


  var stack = 100;
  var bet = 0;
  var deck = [];
  var player = newPlayer();
  var playerHand;
  var playerCount=0;
  var dealerCount=0;
  createDeck();
  // newRound();
function newRound(){
  bet = parseInt(prompt("How much would you like to bet?"));
  updateChips();
  playerCount = 0;
  dealerCount = 0;
  playerHand = new Hand('lance');
  console.log(playerHand);
  dealerHand = new Hand('Dealer');


  playerCount = updateHand(playerHand,playerCount,"players-cards");
  playerCount = updateHand(playerHand,playerCount,"players-cards");

  dealerCount = updateHand(dealerHand,dealerCount,"dealers-cards");

  if(checkBlackjack(playerHand) === true){
    alert("You got Blackjack!");
    stack += (bet*1.5);
    wipe();
    updateChips();
    bet = 0;
  }
  if(checkBlackjack(dealerHand) === true){
    alert("Dealer Blackjack!");
    stack -= (bet*1.5);
    wipe();
    updateChips();
    bet = 0;
  }
}


function doubleDown(hand){
  bet *= 2;
  playerHand.cards.push(selectCard()[0]);
  playerCount = updateHand(playerHand, playerCount,"players-cards");
  dealerTurn();
}

function hit(hand){
    playerHand.cards.push(selectCard()[0]);
    playerCount = updateHand(playerHand, playerCount,"players-cards");
    if(cardValue(playerHand)==="BUST"){
      alert("BUST");
      stack -= (bet);
      wipe();
      updateChips();
      bet=0;
    }
}
// dealerTurn();
function dealerTurn(){
  dealerCount = updateHand(dealerHand, dealerCount,"dealers-cards");
  while (cardValue(dealerHand)<17){
    dealerHand.cards.push(selectCard()[0]);
    dealerCount = updateHand(dealerHand, dealerCount,"dealers-cards");
  }
  winLose();
}

function winLose(){
  if(cardValue(dealerHand)>cardValue(playerHand)){
    alert("you lose");
    stack -= bet;
  } else if (cardValue(dealerHand)===cardValue(playerHand)){
    alert("push");
  } else {
    alert("you win!");
    stack += bet;
  }
  wipe();
  updateChips();
  bet = 0;
}






//push
//dealer soft hand under 17
//split
//betting
//number of decks
//end after win/lose
//buttons
