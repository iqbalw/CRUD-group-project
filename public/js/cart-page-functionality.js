let productTable = document.getElementsByTagName("tbody");
let totalPrices = [];
let shoeNameToIDMap = new Map();
let tableInfo = []
var cards = document.getElementsByClassName("fas fa-plus mr-2"); //returns a nodelist
let totalPrice = 0


function setup() {
  tr = [];
  var trs = document.querySelectorAll("tbody tr"),
  j;
  for (j = 0; j < trs.length; j++) {
      let object = {
        id: trs[j].id,
        name: trs[j].cells.item(2).innerHTML,
        price: trs[j].cells.item(4).innerHTML,
        quantity: trs[j].cells.item(5).innerHTML
      }
      tableInfo.push(object)
    shoeNameToIDMap.set(trs[j].cells.item(2).innerHTML, trs[j].id);
  }
}

function calculatePriceAndTotal() {
    tr = [];
    var trs = document.querySelectorAll("tbody tr"),
    j;
    for (j = 0; j < trs.length; j++) {
      
        console.log(tableInfo[j].price * tableInfo[j].quantity);
        let price = tableInfo[j].price.substring(1,tableInfo[j].price.length);
        console.log(tableInfo[j].quantity);
        let productTotal = price* tableInfo[j].quantity
        totalPrice +=productTotal
        trs[j].cells.item(6).innerHTML = "$" +productTotal
        
  }
}

function incrementQuantity(i) {
    var trs = document.querySelectorAll("tbody tr")
    let price = tableInfo[i].price.substring(1,tableInfo[i].price.length);
    let quantity = Number(trs[i].cells.item(5).innerHTML)
    let oldPrice = price*quantity
    totalPrice = totalPrice - oldPrice
    tableInfo[i].quantity++;
    quantity+= 1
    let newPrice = price*quantity
    totalPrice+=newPrice
    trs[i].cells.item(6).innerHTML = "$" +  (newPrice)
    trs[i].cells.item(5).innerHTML =  quantity
    setTotalPrice()
    
}

function setTotalPrice() {

  // document.querySelector("#")
  document.querySelector("#total-price").innerHTML = "$" + totalPrice;
}

//processing table values and setting price
setup();
calculatePriceAndTotal()

setTotalPrice();
setupEventListenrs()

/**
 *
 * @param {*} name
 */
async function incrementCart(tableRow) {
  //creating data as a object to Stringify for parsing
  let id = tableRow.id;

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


function setupEventListenrs(){
    for (let i = 0; i < cards.length; i++) {
        //adds a click event listener with the function, and the data it needs
        cards[i].addEventListener(
          "click",
          function () {
            incrementCart(tableInfo[i])
            incrementQuantity(i)
            // addToCart(cards[i]);
          },
          false
        );
      }
    }

