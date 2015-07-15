// var deck = [
// "1F0A1","1F0A2","1F0A3","1F0A4","1F0A5","1F0A6","1F0A7","1F0A8","1F0A9","1F0AA","1F0AB","1F0AC","1F0AE",
// "1F0B1","1F0B2","1F0B3","1F0B4","1F0B5","1F0B6","1F0B7","1F0B8","1F0B9","1F0BA","1F0BB","1F0BC","1F0BE",
// "1F0C1","1F0C2","1F0C3","1F0C4","1F0C5","1F0C6","1F0C7","1F0C8","1F0C9","1F0CA","1F0CB","1F0CC","1F0CE",
// "1F0D1","1F0D2","1F0D3","1F0D4","1F0D5","1F0D6","1F0D7","1F0D8","1F0D9","1F0DA","1F0DB","1F0DC","1F0DE"
// ];
//Create the initial deck *need to figure out how to display unicode
var deck = [
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10,
  1,2,3,4,5,6,7,8,9,10,10,10,10
];
//set
var deckCount = deck.length;
//select a card at random  and remove it from the deck
function selectCard(){
  var index = Math.random();
  var cardPos = index * deckCount;
  var card = deck.splice(cardPos, 1);
  //console.log(cardPos,card);
  deckCount = deckCount - 1;
  //console.log(deckCount);
  return card;
}

function Hand(name) {
  this.name = name;
  this.cards = [0,0,0,0,0,0,0,0,0];
  this.cards[0] = selectCard();
  this.cards[1] = selectCard();
  console.log(this.cards);
}

function cardValue(cards){
  var handValue;
  for (var i = 0; i < cards.length; i++) {
    if (handValue < 22) {
      handValue += cards[i];
    } else {
      handValue = "BUST";
    }
  }
  return handValue;
}

var player1hand = new Hand('zach')
var player2hand = new Hand('lance')
var dealerHand = new Hand('computer')

console.log("player1 ",player1hand.card1,player1hand.card2,
"player2 ",player2hand.card1,player2hand.card2,
"dealer ",dealerHand.card1,dealerHand.card2);
checkBlackjack(dealerHand);
checkBlackjack(player1hand);
checkBlackjack(player2hand);
//Check to see if hand is a 10,1 or 1,10
function checkBlackjack(hand){
if ((hand.card1[0] + hand.card2[0] === 11) && (hand.card1[0] ===10 || hand.card2[0] === 10) ) {
  alert(hand.name + " BlackJack");
} else {
  console.log("No Blackjack");
}
}




//for loop on array to test value of hand.
