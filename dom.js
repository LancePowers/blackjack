
document.getElementById("hit").addEventListener("click", function(){hit(playerHand)});
document.getElementById("stay").addEventListener("click", function(){dealerTurn()});
document.getElementById("deal").addEventListener("click", function(){newRound()});
document.getElementById("wipe").addEventListener("click", function(){wipe()});
// document.getElementById("bet").addEventListener("click", function(){bet(});
// document.getElementById("double").addEventListener("click", function(){hit(playerHand)});
function addElement (newClass,image,cardSlot) {
  // create a new div element
  // and give it some content
  var newDiv = document.createElement("h1");
  newDiv.setAttribute("class",newClass);
  //console.log(newDiv);
  var newContent = image;
  //console.log(newContent);
  newDiv.innerHTML = image; //add the text node to the newly created div.

  // add the newly created element and its content into the DOM
  var currentDiv = document.getElementById(cardSlot);
  //console.log(currentDiv);
  currentDiv.parentNode.insertBefore(newDiv, currentDiv);
}
function resetTable(count, id){
  var currentDiv = document.getElementById(id);
  for (var i = 0; i < count; i++) {
    var child = currentDiv.lastChild;
    currentDiv.parentNode.removeChild(child);
  }
}
function wipe(){
  resetTable(dealerCount,"dealer");
  resetTable(playerCount,"player");
}
