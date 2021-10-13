let productTable = document.getElementsByTagName("tbody");
let totalPrices = [];
let shoeNameToIDMap = new Map();


function setupMappingsForShoeToID() {
  tr = [];
  var trs = document.querySelectorAll("tbody tr"),
  j;
  for (j = 0; j < trs.length; j++) {
    shoeNameToIDMap.set(trs[j].cells.item(2).innerHTML, trs[j].id);
  }
  console.log(shoeNameToIDMap);
}

setupMappingsForShoeToID();

function calculatePrices() {
  let shoePrice;
  let quantity;
  let quantityNum = 0;
  let name;
  var tds = document.querySelectorAll("tbody td"),
  i;
  for (i = 0; i < tds.length; ++i) {
    if (tds[i].id === "name") {
      console.log();
      name = tds[i].innerHTML;
    }
    if (tds[i].id === "price") {
      shoePrice = Number(tds[i].innerHTML.substring(1, tds[i].length));
    }
    if (tds[i].id === "quantity") {
      quantityNum = i;
      quantity = Number(tds[i].innerHTML);
    }
    if (tds[i].id === "total") {
      let totalPrice = quantity * shoePrice;
      totalPrices.push(totalPrice);
      tds[i].innerHTML = "$" + totalPrice;
    }
    if ((tds[i].id = "add")) {
      tds[i].addEventListener("click", function () {
        console.log(quantityNum);
        let newQuantity = Number(tds[quantityNum].innerHTML) + 1;  
        console.log(newQuantity);
        tds[quantityNum].innerHTML = newQuantity
        incrementCart(name);
        // calculatePrices();
        // setTotalPrice();
      });
    }
  }
}
function setTotalPrice() {
  let totalPrice = 0;
  for (let i = 0; i < totalPrices.length; i++) {
    totalPrice += totalPrices[i];
  }
  // document.querySelector("#")
  document.querySelector("#total-price").innerHTML = "$" + totalPrice;
}

//processing table values and setting price
calculatePrices();
setTotalPrice();

/**
 *
 * @param {*} name
 */
async function incrementCart(name) {
  console.log("AAAAAA");
  //creating data as a object to Stringify for parsing
  console.log(name);
  let id = shoeNameToIDMap.get(name);

  console.log(id);
  let data = {
    productID: id,
    onCartPage: true,
  };
  //trying to send the post request with the required data
  try {
    //async request
    const response = await fetch("/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    //if it is completed print this out for debugging
    //   alert(`${shoeName} was added to cart!`)
    console.log("Completed!", response);
  } catch (err) {
    //if it is incomplete print the error out for debugging
    console.error(`Error: ${err}`);
  }
}
