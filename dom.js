
$("#hit").on("click", function(event){ hit(player.hand); });
$("#stay").on("click", function(event){ dealerTurn(); });
$("#deal").on("click", function(event){ newRound(); });
$("#double").on("click", function(event){ doubleDown(player.hand); });
$("#split").on("click", function(event){ split(player); });
$('#change-bet').on('click', function(){
  player.defaultBet = prompt("What would you like to change your bet to?");
});

function splitSpot(){
  var playerSpot = $('#players-cards');
  var parentSpot = $('#player-area');
  var newSpot = document.createElement('div');
  newSpot.class = 'card';
  newSpot.id = 'players-cards-split';
  parentSpot.insertBefore(newSpot, parentSpot);
}

//in: name process: creates a div element to hold a hand.
function addCardSlot(actor){
  $('.hand').append($('<div></div>').attr('id', actor.name + '-cards'));
  return "#" + actor.name + '-cards';
};

function updateHand(hand){
  var cardsDisplayed ="";
  for (var i = 0; i < hand.cards.length; i++) {
    cardsDisplayed += " " + hand.cards[i].image;
  }
  $(hand.cardSlot).text(cardsDisplayed);
}

///!!!!!!!!!!!!!!!!!!
function updateChips(){
  $("chips").innerHTML = player.stack;
  $("bet-amount").innerHTML = player.hand.bet;
}
