
//prompts user for name and creates 3 hands (2 player 1 dealer).
//Need to add ability to choose # of players
function newPlayer(){
  var p1name = prompt("What's your name?");
  var player1hand = new Hand(p1name);
  return player1hand;
}

//checks a hand for blackJack
function checkBlackjack(hand){
  if ((hand.cards[0].value + hand.cards[1].value) === 21){
    alert(hand.name + " BlackJack");
  } else {
    //console.log("No Blackjack");
  }
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
  var handValue = 0;
  for (var i = 0; i < hand.cards.length; i++) {
    handValue += hand.cards[i].value;
  }
  //call a split function...
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
function updateHand(player, newClass, count, cardslot){
  var image = player.cards[count].image;
  console.log(image);
  addElement(newClass,image,cardslot);
  count++;
  return count;
}



var deck = [];
createDeck();
var player1hand = newPlayer();
var playerCount = 0;
playerCount = updateHand(player1hand,"person",playerCount,"player");
console.log(playerCount);
playerCount = updateHand(player1hand,"person",playerCount,"player");
//console.log(player1hand);
var dealerHand = new Hand('Dealer');
var dealerCount = 0;
dealerCount = updateHand(dealerHand,"dealer",dealerCount,"dealer");

// updateHand(dealerHand,"dealer");
checkBlackjack(player1hand);
checkBlackjack(dealerHand);
console.log(cardValue(player1hand));






var hit = prompt("hit?");
console.log("test");
while (hit === "Y"){
  player1hand.cards.push(selectCard()[0]);
  playerCount = updateHand(player1hand,"person",playerCount,"player");
  if(cardValue(player1hand)==="BUST"){
    alert("BUST");
    break;
  } else {
  hit = prompt("hit? ");
 }
}
dealerCount = updateHand(dealerHand,"dealer",dealerCount,"dealer");
while (cardValue(dealerHand)<17){
  dealerHand.cards.push(selectCard()[0]);
  dealerCount = updateHand(dealerHand,"dealer",dealerCount,"dealer");
}
if(cardValue(dealerHand)>cardValue(player1hand)){
  alert("you lose");
} else{
  alert("you win");
}
//
// console.log("player1 ",player1hand.cards,
// "player2 ",player2hand.cards,
// "dealer ",dealerHand.cards);
// checkBlackjack(dealerHand);
// checkBlackjack(player1hand);
// checkBlackjack(player2hand);
// //Check to see if hand is a 10,1 or 1,10
// function checkBlackjack(hand){
// if ((hand.cards[0] + hand.cards[1] === 11) && (hand.cards[0] ===10 || hand.cards[1] === 10) ) {
//   alert(hand.name + " BlackJack");
// } else {
//   console.log("No Blackjack");
// }
// }
//
//
//
//
//
// //for loop on array to test value of hand.
////////////////////////////Trash//////////////
// var deckImage = ["🂡","🂢","🂣","🂤","🂥","🂦","🂧","🂨","🂩","🂪","🂫","🂬","🂭","🂮","🂱","🂲","🂳","🂴","🂵","🂶","🂷","🂸","🂹","🂺","🂻","🂼","🂽","🂾","🃁","🃂","🃃","🃄","🃅","🃆","🃇","🃈","🃉","🃊","🃋","🃌","🃍","🃎","🃑","🃒","🃓","🃔","🃕","🃖","🃗","🃘","🃙","🃚","🃛","🃜","🃝","🃞"];
//var deckImage = new Array[🂡,🂢,🂣,🂤,🂥,🂦,🂧,🂨,🂩,🂪,🂫,🂬,🂭,🂮,🂱,🂲,🂳,🂴,🂵,🂶,🂷,🂸,🂹,🂺,🂻,🂼,🂽,🂾,🃁,🃂,🃃,🃄,🃅,🃆,🃇,🃈,🃉,🃊,🃋,🃌,🃍,🃎,🃑,🃒,🃓,🃔,🃕,🃖,🃗,🃘,🃙,🃚,🃛,🃜,🃝,🃞];
