
$("#hit").on("click", function(event){ blackJack.activePlayers[0].hit();});
$("#stay").on("click", function(event){ blackJack.dealerTurn(); });
$(".deal").on("click", function(event){ blackJack.deal(); });
$("#double").on("click", function(event){ doubleDown(player.hand); });
$("#split").on("click", function(event){ player.hand = new Hand('split'); });
$('#change-bet').on('click', function(){
  player.defaultBet = prompt("What would you like to change your bet to?");
});

Player.prototype.updateCards = function(){
  this.spot.html('');
  for (var i = 0; i < this.hands[0].cards.length; i++) {
    this.spot.append(this.hands[0].cards[i].image);
  }
}
Game.prototype.alertResults = function(results){
  var alertType;
  var alertText;
  switch (results) {
    case 'win':
      alertType = 'btn-success';
      alertText = 'You Win!'
      break;
    case 'lose':
      alertType = 'btn-danger';
      alertText = 'You Lose!'
      break;
    case 'playerBJ':
      alertType = 'btn-success';
      alertText = 'You got BlackJack!'
      break;
    case 'dealerBJ':
      alertType = 'btn-danger';
      alertText = 'Dealer got BlackJack'
      break;
    case 'dealerBust':
      alertType = 'btn-success';
      alertText = 'Dealer Bust!'
      break;
    case 'playerBust':
      alertType = 'btn-danger';
      alertText = 'You Busted.'
    case 'push':
      alertType = 'btn-warning';
      alertText = 'Push'
      break;
    default:
      alertType = 'btn-primary';
      alertText = 'Welcome to the Table! Click here to get started.'

  }
  $('#results > button').toggleClass('hidden');
  $('#results').addClass(alertType);
  $('#results').text(alertText);
  $('#results').on('click', function(){blackJack.clearResults(alertType);})
}
Game.prototype.clearResults = function(alertType){
  $('#results').removeClass(alertType);
  $('#results').text("");
}


blackJack.alertResults();
