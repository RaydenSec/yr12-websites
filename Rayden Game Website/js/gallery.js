// From Excel File
var gamesList = `src,name,price,max,genre
Witcher3.png,Witcher 3,2,3,adventure
gtav.png,GTA V,5,10,adventure
wdl.png,Watch Dogs Legion,2,2,adventure
ac_odyssey.png,Assassins Creed Odyssey,3,2,adventure
ac_origins.png,Assassins Creed Origins,3,3,adventure
lastofus2.png,Last of Us 2,5,8,horror
rev.png,Resident Evil Village,3,6,horror
hollowknight.png,Hollow Knight,2,8,indie
bf2042.png,Battlefield 2042,8,18,adventure`;

gamesArray = [];
row = gamesList.split("\n");
headers = row[0].split(","); // first line (index 0) titles

gameLibraryInit();

function gameLibraryInit() {

  for (i = 1; i < row.length; i++) {  // row[1] is Witcher3.png,Witcher 3,20 allowing for each game to be seperated by new line slashn
    rowData = row[i].split(","); // Allows for each row of game, (1 or above, not titles), to be seperated by the commas

    gamesArray[i] = {};

    for (j = 0; j < rowData.length; j++) {

      gamesArray[i][headers[j]] = rowData[j];

    }
  }
}

numGames = gamesList.split(/\r\n|\r|\n/).length - 1; // Using Regex to count number of lines in gamesList - 1

// Append Game Function
function appendGames(counter) {
  const divTag = document.createElement('div');
  divTag.classList.add("game");
  divTag.innerHTML = '<img onclick="preview(this.id);" class="gameCover" id="cover' + counter + '" src="../images/' + gamesArray[counter].src + '">';
  main.appendChild(divTag);
}

displayGames(numGames);

// Display all Games
function displayGames(numGames) {
  main.innerHTML = "";

  counter = 1;  // As gamesArray[1] index starts at 1 due to category titles at 0

  while (counter <= numGames) {
    appendGames(counter);
    counter += 1;
  }

  document.genre.genreSelect.selectedIndex = 0;
  document.querySelector(".nameFilterBox").value = "";

}

// Filter Games Displayed By Name
function filterByName() {
  document.genre.genreSelect.selectedIndex = 0;

  main.innerHTML = "";  // Reset Main Div Games (delete and add method)

  for (i = 1; i <= numGames; i++) {
    inputName = document.querySelector(".nameFilterBox").value.toUpperCase();
    gameCheck = gamesArray[i].name.toUpperCase();

    if (gameCheck.indexOf(inputName) > -1) {  // filter (not case sensitive) input is checked for any index in case our website's name is different, therefore the beginning of the content
      appendGames(i);
    }
  }

}

// Filter Games Displayed by Genre Selected
function selectGenre(genreOption) {
  document.querySelector(".nameFilterBox").value = "";

  main.innerHTML = "";

  switch (genreOption) {
    case 0:
    for (i = 1; i <= numGames; i++) {
      appendGames(i);
    }
      break
    case 1:
      for (i = 1; i <= numGames; i++) {
        if (gamesArray[i].genre == "adventure")
          appendGames(i);
      }
      break;
    case 2:
      for (i = 1; i <= numGames; i++) {
        if (gamesArray[i].genre == "horror")
          appendGames(i);
      }
      break;
    case 3:
      for (i = 1; i <= numGames; i++) {
        if (gamesArray[i].genre == "indie")
          appendGames(i);
      }
      break;
    default:
    for (i = 1; i <= numGames; i++) {
      appendGames(i);
    }
  }
}

/* Open Selected Game */
toggleCounter = 0;  // Public variable as function will run more than once, and toggleCounter does not want to be reset every time

// Declaration of selected game name and price as global variables to be later used later in add to cart function
gameNum = {};
gameName = {};
gameCost = {};
gamePath = {};
gameMax = {};

function preview(gameID) {

  document.querySelector(".selectedGameContainer").classList.toggle("visibility");

  blurContainer = [".navContainer", ".spotlightContainer", "#main"];

  if (toggleCounter == 0) {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = 80;
    }
    toggleCounter = 1;
  }
  else {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = -10;
    }
    toggleCounter = 0;
  }


  gameNum = gameID.slice(5); // As id is "cover" + [counter], remove first 5 string, which leaves num, to use for gamesArray calling

  gameName = gamesArray[gameNum].name;
  gameCost = gamesArray[gameNum].price;
  gamePath = gamesArray[gameNum].src;
  gameMax = gamesArray[gameNum].max;

  imgContainer = document.querySelector(".left");
  headerContent = document.querySelector(".selectName");
  priceContent = document.querySelector(".selectPrice");

  imgContainer.style.background = "url('../images/previewImages/preview_" + gamePath + "')";
  imgContainer.style.backgroundSize = "cover";
  imgContainer.style.backgroundRepeat = "no-repeat";

  headerContent.innerHTML = gameName;

  priceContent.innerHTML = "Price: $" + gameCost + " (per week)";

  resetQty();
}
/* End of Open Selected Game */

function resetQty() {
  document.querySelectorAll(".inputStyle")[0].value = 1;
  document.querySelectorAll(".inputStyle")[1].value = 1;
}

/* Play Trailer */
function playCoverTrailer() {
  document.querySelector(".trailerContainer").classList.toggle("visibility");
  document.querySelector("video").currentTime = 0;

  blurContainer = [".navbarContainer", ".spotlightContainer", "#main"];

  if (toggleCounter == 0) {
    document.querySelector("video").play();
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = 80;
    }
    toggleCounter = 1;
  }
  else {
    document.querySelector("video").pause();
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = -10;
    }
    toggleCounter = 0;
  }
}
/* End of Play Trailer */

/* Scroll Change Navbar Opacity */

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  navContainer = document.querySelector(".navContainer");

  if (window.scrollY <= 600 && window.scrollY >= 80)
    navContainer.style.opacity = "60%";
  else
    navContainer.style.opacity = "90%";
}

/* End of Scroll Change Navbar Opacity */

/* Send Email */
function sendEmail() {
  /* Due to smtp unavailability and no domain money, this is the only method */

  subject = String(document.querySelectorAll(".contactInput")[1].value);
  body = String(document.querySelector(".form-input").value);

  window.open('mailto:shadwbeam@gmail.com?subject=' + subject + '&body=' + body);
}
/* End of Send Email */

/* Close Selected Game Container */
function closeGameContainer() {
  document.querySelector(".selectedGameContainer").classList.toggle("visibility");

  blurContainer = [".navContainer", ".spotlightContainer", "#main"];

  if (toggleCounter == 0) {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = 80;
      // document.querySelector(blurContainer[i]).style.filter = "blur(3px)";  /* style unknown error */
    }
    toggleCounter = 1;
  }
  else {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = -10;
      // document.querySelector(blurContainer[i]).style.filter = "none";  /* not unblurring */
    }
    toggleCounter = 0;
  }
}
/* End of Close Selected Game Container */

// Class declaration for instances created for games added to Game Basket
class gameBasketItem {
  constructor(imgPath, name, price, rentalTime, gameKey) {
    this.imgPath = imgPath;
    this.name = name;
    this.price = price;
    this.rentalTime = rentalTime;
    this.gameKey = gameKey; // Similar to SQL keys, making sure item quantity is not exceeded. (each game has unique key)
  }
}

// Array of all gameBasketItem instances that are added to Game Basket
gamesList = [];

/* Add selected item to cart function */
function addToCart() {
  rentalPeriod = document.getElementById("numDays").value;
  itemQty = document.getElementById("gameQty").value;//Get .dropdown-shirts input

  addItems(itemQty);

  // Add all keys to key array
  addedGameKeys = []; // Array of all keys of games added to Game Basket, as each game has unique key
  for (i = 0; i < gamesList.length; i++) {
    addedGameKeys.push(parseInt(gamesList[i].gameKey)); // Appending current game's gamekey for later checking
  }

  if (!(checkLimit(addedGameKeys, itemQty))) {
    alert(gameName + " quantity exceeded, only a total of " + gamesArray[gameNum].max + " games are available right now");
  }
  else {
    alert(gameName + " added to Cart");
  }

}
/* End of Add selected item to cart function */

// discuss limit testing and finding this problem, thus presented solution
/* Check game quantity limit */
function checkLimit(addedGameKeys, itemQty) {
  addedGameKeys.sort();

  var current = null;
  var totalCount = 0;
  for (var i = 0; i < addedGameKeys.length; i++) {
      if (addedGameKeys[i] != current) {
        current = addedGameKeys[i]; // Using this to continously compare to the next sorted index
        totalCount = 1;
      } else {
        totalCount += 1;
      }
  }

    // Remove previously added games that have exceeded the limit
    if (totalCount > gamesArray[gameNum].max) { // gamesArray[gameNum].max is the instace of the game's limit that we're comparing the repeated games to
      removeItems(itemQty);
      return false;
    }
    else {
      return true;
    }
}
/* End of Check game quantity limit */

// Say we use console.log for arrays and instaces to test code errors
  //Note, we'll probably need a seperate remove items fucntion in cart

// Add item quantity individually to gamesList
function addItems(itemQty) {
  tempCount = 0;
  while (tempCount < itemQty) {
    cartItemObj = new gameBasketItem(gamePath, gameName, gameCost, rentalPeriod, gameNum);
    gamesList.push(cartItemObj);
    tempCount += 1;
  }
}

function removeItems(itemQty) {
  tempCount = 0;
  while (tempCount < itemQty) {
    gamesList.pop();
    addedGameKeys.pop();
    tempCount += 1;
  }
}


// Checkout appear on click function
/* Open checkout Container */
function checkoutPopout() {
  document.querySelector(".cartContainerBackground").classList.toggle("visibility");

  blurContainer = [".navbarContainer", ".spotlightContainer", "#main"];

  if (toggleCounter == 0) {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = 80;
    }
    toggleCounter = 1;
  }
  else {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = -10;
    }
    toggleCounter = 0;
  }

  generateGameCart();
}
/* End of Open checkout Container */


shippingPrice = 0; // shippingPrice is globally declared so totalPrice can be displayed without shipping selected, used for shipping function

/* Generate Cart Games */
function generateGameCart() { // Create all the games in gamesList with images etc in seperate div rows inside big grey div with scroll bar, left div is fixed
  document.querySelector(".cartList").innerHTML = "";
  document.shipping.shippingSelect.selectedIndex = -1;

  cartDivArr = [];

  for (i = 0; i < gamesList.length; i++) {
    divTag = document.createElement('div');

    divTag.classList.add("cartDivTag");

    if (gamesList[i].rentalTime == 1) // for correct plural
      week = "week";
    else
      week = "weeks";

    divTag.innerHTML = '<img src="../images/' + gamesList[i].imgPath +
    '" class="cartItemImg"></img><h5 class="cartItemHeading">' +
    gamesList[i].name +
    '<br><br><p>Rental Time: ' + gamesList[i].rentalTime + ' ' + week + '</p><br><p>Cost: $' + (gamesList[i].rentalTime * gamesList[i].price) + '</p><br><button value="' + i + '" class="removeItem" onclick="removeCartItem(this.value);">Remove</button>';

    // qty (with + -, remember limit)
    // Add css to make each div row look good

    document.querySelector(".cartList").appendChild(divTag);

  }

  totalPrice(shippingPrice);
}
/* End of Generate Cart Games */

function removeCartItem(gameNum) {
  gamesList.splice(gameNum, 1);
  document.querySelector(".cartList").innerHTML = ""; // Delete Cart for refresh
  generateGameCart();
}

// Shipping Select
function selectShipping(shipCost) {
  switch (shipCost) {
    case 0:
      shippingPrice = 10;
      break;
    case 1:
      shippingPrice = 30;
      break;
    case 2:
      shippingPrice = 60;
      break;
    default:
      shippingPrice = 0;
    }

  totalPrice(shippingPrice);
}
// Error discussion, check photos: had to comment out to find root cause, ended up there already being shippingSleect as the name of the select

// Display Total Price
function totalPrice(shippingPrice) {
  cartTotalCost = 0;

  for (i = 0; i < gamesList.length; i++) {
    cartTotalCost += parseInt(gamesList[i].price * gamesList[i].rentalTime);
  }

  cartTotalCost += parseInt(shippingPrice);

  document.querySelector(".checkoutTotal").innerHTML = "Checkout Total: $" + cartTotalCost;
};

function reset() {
  document.shipping.shippingSelect.selectedIndex = -1;
  for (i = 0; i < gamesList.length; i++) {
    gamesList.pop();
  }
  generateGameCart();
  document.querySelector(".cartList").innerHTML = "";
  totalPrice(0);
}

function closeCartContainer() {
  document.querySelector(".cartContainerBackground").classList.toggle("visibility");

  blurContainer = [".navContainer", ".spotlightContainer", "#main"];

  if (toggleCounter == 0) {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = 80;
      // document.querySelector(blurContainer[i]).style.filter = "blur(3px)";  /* style unknown error */
    }
    toggleCounter = 1;
  }
  else {
    for (i = 0; i <= blurContainer.length; i++) {
      document.querySelector(".backgroundContainer").style.zIndex = -10;
      // document.querySelector(blurContainer[i]).style.filter = "none";  /* not unblurring */
    }
    toggleCounter = 0;
  }
}
