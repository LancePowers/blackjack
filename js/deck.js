
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
//i: nothing p: combines names o: name - suit string
function deckNames(){
  var suit = ["_of_Clubs.svg","_of_Diamonds.svg","_of_Hearts.svg","_of_Spades.svg"];
  var face = ["ace","2","3","4","5","6","7","8","9","10","jack","queen","king"];
  face = face.reverse();
  var size = 52;
  var namedDeck = [];
  for (var i = 0; i < suit.length; i++) {
     for (var j = 0; j < face.length; j++) {
       namedDeck[size] = face[j] + suit[i];
       size -= 1;
     }
  }
  return namedDeck;
}

//runs 3 arrays to combine name, value, and image into an array of objects.
function createDeck(){
  var output = [];
  for (var i = 0; i < 52; i++) {
    var name = deckNames()[i+1];
    var value = deckValue[i];
    var image = $('<img/>').attr('src', 'img/'+name);
    output[i] = new Card(name,value,image);
  }
  return output;
}

//Card builds a card with name, value, and image. Can add a parameter and additional string to the createdDeck.
//I think this may be able to be combined with createDeck.
function Card(name,value,image){
  this.name = name;
  this.value = value;
  this.image = image;
}
