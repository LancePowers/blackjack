
document.getElementById("hit").addEventListener("click", function(){hit(player.hand);});
document.getElementById("stay").addEventListener("click", function(){dealerTurn();});
document.getElementById("deal").addEventListener("click", function(){newRound();});
document.getElementById("double").addEventListener("click", function(){doubleDown(player.hand);});
document.getElementById("split").addEventListener("click", function(){split(player);});
document.getElementById('change-bet').addEventListener('click', function(){
  player.defaultBet = prompt("What would you like to change your bet to?");});



function updateHand(actor,cardSlot,deal){
  var count = 1;
  var currentDiv = document.getElementById(cardSlot);
  if(currentDiv.children.length > 0) { wipe(cardSlot); }
  if(deal === undefined){count = actor.hand.cards.length;}
    for (i = 0; i < count; i++) {
      showCard(actor,cardSlot,currentDiv);
    }
}

function showCard(actor, cardSlot, currentDiv){
  var newDiv = document.createElement("h1");
  newDiv.setAttribute("class",cardSlot);
  newDiv.innerHTML = actor.hand.cards[i].image;
  currentDiv.appendChild(newDiv);
}

function wipe(id){
  var clearCards = document.getElementById(id);
  while(clearCards.firstChild){
    clearCards.removeChild(clearCards.firstChild);
  }
}

function updateChips(){
  document.getElementById("chips").innerHTML = player.stack;
  document.getElementById("bet-amount").innerHTML = player.hand.bet;
}

