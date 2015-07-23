
document.getElementById("hit").addEventListener("click", function(){hit(playerHand);});
document.getElementById("stay").addEventListener("click", function(){dealerTurn();});
document.getElementById("deal").addEventListener("click", function(){newRound();});
document.getElementById("double").addEventListener("click", function(){doubleDown(playerHand);});

function displayResults(text){
 var resultBox = document.getElementById('results');
 resultBox.setAttribute ("class", 'result-box');
 resultBox.setAttribute('id','result');
 resultBox.innerHTML = text;
 document.body.appendChild(resultBox);
}



function addElement (image,cardSlot){
  // create a new div element
  // and give it some content
  var newDiv = document.createElement("h1");
  newDiv.setAttribute("class",cardSlot);
  //console.log(newDiv);
  var newContent = image;
  //console.log(newContent);
  newDiv.innerHTML = image; //add the text node to the newly created div.

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById(cardSlot);
  //console.log(currentDiv);
  currentDiv.appendChild(newDiv);
}


function wipe(){
  var dealerClear = document.getElementById("dealers-cards");
  var playerClear = document.getElementById("players-cards");
  while(dealerClear.firstChild){
    dealerClear.removeChild(dealerClear.firstChild);
  }
  while(playerClear.firstChild){
    playerClear.removeChild(playerClear.firstChild);
  }
}

function updateChips(){
  document.getElementById("chips").innerHTML = stack;
  document.getElementById("betAmount").innerHTML = bet;
}
function deactivate(id){
  var targetBtn = document.getElementById(id);
  targetBtn.setAttribute("class",deactivated);
}
