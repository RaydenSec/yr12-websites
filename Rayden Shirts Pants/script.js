// Products
Array.from(document.querySelectorAll(".navigation-button")).forEach(current_item => {
  current_item.onclick = () => {
    current_item.parentElement.parentElement.classList.toggle("change");
  };
});
// End of Products

// Initial Load
for (i=0; i < 2; i++) {
  document.shirtType.shirt[i].checked = false;
}
for (i=0; i < 2; i++) {
  document.pantsType.pants[i].checked = false;
}

document.shipping.shippingSelect.selectedIndex = -1;
// End of Initial Load

// Pricing
var totalPrice = 0; // Total price
var shirtsPrice = 0;
var pantsPrice = 0;
var shippingPrice = 0;
// End of Pricing

// Cost Display
function myDisplay() {
  totalPrice = shirtsPrice + pantsPrice + 40 + shippingPrice;
  document.getElementById("total-cost").innerHTML = "$ " + totalPrice;
}
// End of Cost Display

// Shirt Options
function setOptionsShirts() {
  shirtImage = document.getElementById("shirt-card");
  if (document.shirtType.shirt[0].checked == true) {
    shirtsPrice = 45;
    shirtImage.src = "images/shirt-1.jpg";
  }
  else if (document.shirtType.shirt[1].checked == true) {
    shirtsPrice = 50;
    shirtImage.src = "images/shirt-2.jpg";
  }
  else if (document.shirtType.shirt[2].checked == true) {
    shirtsPrice = 55;
    shirtImage.src = "images/shirt-3.jpg";
  }
  shirtsPrice *= document.getElementById("dropdown-shirts").value;
  myDisplay();
  document.getElementById("shirt-cost").innerHTML = "$ " + shirtsPrice;
}
// End of Shirt Options

// Pants Options
function setOptionsPants() {
  pantsImage = document.getElementById("pants-card");
  if (document.pantsType.pants[0].checked == true) {
    pantsPrice = 80;
    pantsImage.src = "images/pants-1.jpg";
  }
  else if (document.pantsType.pants[1].checked == true) {
    pantsPrice = 90;
    pantsImage.src = "images/pants-2.jpg";
  }
  else if (document.pantsType.pants[2].checked == true) {
    pantsPrice = 100;
    pantsImage.src = "images/pants-3.jpg";
  }
  pantsPrice *= document.getElementById("dropdown-pants").value;
  myDisplay();
  document.getElementById("pants-cost").innerHTML = "$ " + pantsPrice;
}

function resetShirts() {
  for (i=0; i < 3; i++) {
    document.shirtType.shirt[i].checked = false;
  }
  document.getElementById("dropdown-shirts").value = 1;
  document.getElementById("shirt-card").src = "images/card-product-1.jpg";
  document.getElementById("shirt-cost").innerHTML = "";
}

function resetPants() {
  for (i=0; i < 3; i++) {
    document.pantsType.pants[i].checked = false;
  }
  document.getElementById("dropdown-pants").value = 1;
  document.getElementById("pants-card").src = "images/card-product-2.jpg";
  document.getElementById("pants-cost").innerHTML = "";
}
// End of Pants Options

// Reset
function reset() {
  document.getElementById("total-cost").innerHTML = "";
  for (i=0; i < 3; i++) {
    document.shirtType.shirt[i].checked = false;
  }
  for (i=0; i < 3; i++) {
    document.pantsType.pants[i].checked = false;
  }
  document.shipping.shippingSelect.selectedIndex = -1;
  document.getElementById("dropdown-shirts").value = 1;
  document.getElementById("dropdown-pants").value = 1;
  document.getElementById("shirt-card").src = "images/card-product-1.jpg";
  document.getElementById("pants-card").src = "images/card-product-2.jpg";
  document.getElementById("shirt-cost").innerHTML = "";
  document.getElementById("pants-cost").innerHTML = "";
}
// End of Reset

// Ship Cost
function run(shipCost) {
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
  myDisplay();
}
// End of Ship Cost
