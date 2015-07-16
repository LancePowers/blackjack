// var deckImage = ["🂡","🂢","🂣","🂤","🂥","🂦","🂧","🂨","🂩","🂪","🂫","🂬","🂭","🂮","🂱","🂲","🂳","🂴","🂵","🂶","🂷","🂸","🂹","🂺","🂻","🂼","🂽","🂾","🃁","🃂","🃃","🃄","🃅","🃆","🃇","🃈","🃉","🃊","🃋","🃌","🃍","🃎","🃑","🃒","🃓","🃔","🃕","🃖","🃗","🃘","🃙","🃚","🃛","🃜","🃝""🃞"];
// console.log(deckImage);
//Create the initial deck *need to figure out how to display unicode
var deckValue= [
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10
];

//deckNames is a function to combine the faces and suits into a diplayable name//
function deckNames(){
  var suit = [" of Hearts"," of Spades"," of Clubs"," of Diamonds"];
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

//runs 2 strings (a third for images) to combine cards in a deck. Can easily expand to other strings of data to add to cards if needed.
function createDeck(){
  for (var i = 0; i < 52; i++) {
    var name = deckNames()[i+1];
    var value = deckValue[i];
    deck[i] = new Card(name,value,"")
  }
}

//Builds a card with name, value, and image. Can add a parameter and additional string to the createdDeck.
//I think this may be able to be combined with createDeck.
function Card(name,value,image){
  this.name = name;
  this.value = value;
  this.image = image;
}
var deck = [];
createDeck();

//function to select one card at random and remove it from the deck.
function selectCard(){
  var deckCount = deck.length;
  var index = Math.random();
  var cardPos = index * deckCount;
  var card = deck.splice(cardPos, 1);
  //console.log(cardPos,card);
  deckCount = deckCount - 1;
  //console.log(deckCount);
  return card;
}

//constructor for hand creates a 2 card hand and assigns it to a player
function Hand(name) {
  this.name = name;
  this.cards = [selectCard()[0],selectCard()[0]];
  console.log(this.cards);
}

//checks a hand for blackJack
function checkBlackjack(hand){
if ((hand.cards[0].value + hand.cards[1].value === 11) && (hand.cards[0].value ===10 || hand.cards[1].value === 10) ) {
  alert(hand.name + " BlackJack");
} else {
  console.log("No Blackjack");
}
}
var player1hand = new Hand('zach')
var player2hand = new Hand('lance')
var dealerHand = new Hand('computer')

//function to determine value of a hand/if it's busted/////STILL NEED TO FIGURE OUT SOFT HANDS
function cardValue(hand){
  var handValue = 0;
  for (var i = 0; i < hand.cards.length; i++) {
    handValue += hand.cards[i].value;
    if (handValue < 22) {
      console.log(hand.cards.length);
    } else {
      alert("BUST");
    }
  }
  return handValue;
}
//
console.log(player1hand.cards[0].value);
console.log(deck.length);
checkBlackjack(player1hand);
checkBlackjack(player2hand);
checkBlackjack(dealerHand);
console.log(cardValue(player1hand));
var hit = prompt("hit?");
while (hit === "Y"){
  player1hand.cards.push(selectCard()[0]);
  console.log(cardValue(player1hand));
  console.log(player1hand);
  hit = prompt("hit?");
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
