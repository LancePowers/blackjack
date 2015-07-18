//document.body.onload = addElement("person",'&#x1F0A2');

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
