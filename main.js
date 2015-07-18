//Global variable for players hands
//deckImage is an array of images to use for cards.
var deckImage =  [
   '&#x1F0A1','&#x1F0A2','&#x1F0A3','&#x1F0A4','&#x1F0A5','&#x1F0A6','&#x1F0A7',
   '&#x1F0A8','&#x1F0A9','&#x1F0AA','&#x1F0AB','&#x1F0AD','&#x1F0AE','&#x1F0B1',
   '&#x1F0B2','&#x1F0B3','&#x1F0B4','&#x1F0B5','&#x1F0B6','&#x1F0B7','&#x1F0B8',
   '&#x1F0B9','&#x1F0BA','&#x1F0BB','&#x1F0BD','&#x1F0BE','&#x1F0C1','&#x1F0C2',
   '&#x1F0C3','&#x1F0C4','&#x1F0C5','&#x1F0C6','&#x1F0C7','&#x1F0C8','&#x1F0C9',
   '&#x1F0CA','&#x1F0CB','&#x1F0CD','&#x1F0CE','&#x1F0D1','&#x1F0D2','&#x1F0D3',
   '&#x1F0D4','&#x1F0D5','&#x1F0D6','&#x1F0D7','&#x1F0D8','&#x1F0D9','&#x1F0DA',
   '&#x1F0DB','&#x1F0DD', '&#x1F0DE'
 ];
//deckValue is an array of card values
var deckValue= [
  11,2,3,4,5,6,7,8,9,10,10,10,10,
  11,2,3,4,5,6,7,8,9,10,10,10,10,
  11,2,3,4,5,6,7,8,9,10,10,10,10,
  11,2,3,4,5,6,7,8,9,10,10,10,10
];
//deckNames is a function to combine the faces and suits into a diplayable name //it probably isn't necessary.
function deckNames(){
  var suit = [" of Clubs"," of Diamonds"," of Hearts"," of Spades"];
  var face = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Jack","Queen","King"];
  face = face.reverse();
  var size = 52;
  var deckNames = [];
  for (var i = 0; i < suit.length; i++) {
     for (var j = 0; j < face.length; j++) {
       deckNames[size] = face[j] + suit[i];
       size -= 1
     }
  }
  return deckNames;
}

//runs 3 arrays to combine name, value, and image into an array of objects.
function createDeck(){
  for (var i = 0; i < 52; i++) {
    var name = deckNames()[i+1];
    var value = deckValue[i];
    var image = deckImage[i];
    deck[i] = new Card(name,value,image);
    //console.log(deck[i]);
  }
}

//Card builds a card with name, value, and image. Can add a parameter and additional string to the createdDeck.
//I think this may be able to be combined with createDeck.
function Card(name,value,image){
  this.name = name;
  this.value = value;
  this.image = image;
}

//function to select one card at random and remove it from the deck.
function selectCard(){
  var deckCount = deck.length;
  var index = Math.random();
  var cardPos = index * deckCount;
  var card = deck.splice(cardPos, 1);
  //console.log(cardPos,card);
  deckCount = deckCount - 1;
  //console.log(deckCount);
  //console.log(card);
  return card;
}

//constructor for hand creates a 2 card hand and assigns it to a player
function Hand(name) {
  this.name = name;
  this.cards = [selectCard()[0],selectCard()[0]];
  //console.log(this.cards);
}

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



function updateHand(player, id){
  var cardPics = "";
  for (var i = 0; i < player.cards.length; i++) {
     cardPics = cardPics + player.cards[i].image;
     //console.log(cardPics);
  }
  var element = document.getElementById(id);
  element.innerHTML = cardPics;
}

var deck = [];
createDeck();
var player1hand = newPlayer();
//console.log(player1hand);
var dealerHand = new Hand('Dealer');
updateHand(player1hand,"player1");
updateHand(dealerHand,"dealer");
checkBlackjack(player1hand);
checkBlackjack(dealerHand);
console.log(cardValue(player1hand));






var hit = prompt("hit?");
console.log("test");
while (hit === "Y"){
  player1hand.cards.push(selectCard()[0]);
  updateHand(player1hand,"player1");
  if(cardValue(player1hand)==="BUST"){
    alert("BUST");
    break;
  } else {
  hit = prompt("hit? ");
 }
}
while (cardValue(dealerHand)<17){
  dealerHand.cards.push(selectCard()[0]);
  updateHand(dealerHand,"dealer");
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
