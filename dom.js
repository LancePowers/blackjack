
document.getElementById("hit").addEventListener("click", function(){hit(playerHand);});
document.getElementById("stay").addEventListener("click", function(){dealerTurn();});
document.getElementById("deal").addEventListener("click", function(){newRound();});
document.getElementById("wipe").addEventListener("click", function(){

  wipe();
});
// document.getElementById("bet").addEventListener("click", function(){bet(});
// document.getElementById("double").addEventListener("click", function(){hit(playerHand)});
function addElement (image,cardSlot) {
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
function resetTable(count, id){
  var currentDiv = document.getElementById(id);
  var child = currentDiv.firstChild;
    currentDiv.removeChild(child);
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
        debugger;

}
