/**
 * Array of row objects which I use to handle events and querying 
 */
let tableInfo = [];
/**
 * Buttons used for add event listeners - add buttons
 */
var addButtons = document.getElementsByClassName("fas fa-plus mr-2");
/**
 * Buttons used for trash event listeners - removes items
 */
var trashButtons = document.getElementsByClassName("fas fa-trash"); 
/**
 * Buttons used for removing one item (in terms of quantity)
 */
var minusButtons = document.getElementsByClassName("fas fa-minus mr-2"); 
/**
 * Variable used for maintaining total price.
 */
let totalPrice = 0;

/**
 * Method I use for my setup which creates objects to populate the tableInfo array
 * which I use for passing data around and requests
 */
function setup() {
  //getting the tables rows
  var trs = document.querySelectorAll("tbody tr");

  //looping through the table rows and creating a row object
  //which stores the pieces of information which are useful/subject to change
  //based on actions
  for (let j = 0; j < trs.length; j++) {
    let rowObject = {
      id: trs[j].id,
      name: trs[j].cells.item(2).innerHTML,
      price: trs[j].cells.item(4).innerHTML,
      quantity: trs[j].cells.item(5).innerHTML,
    };
    tableInfo.push(rowObject);
  }
}

/**
 * Goes through rows and sets the totals as well
 * as add to totalPrice which is the sum of all the prices
 */
function setOriginalTotals() {
  var trs = document.querySelectorAll("tbody tr");
  for (let j = 0; j < trs.length; j++) {
    let price = tableInfo[j].price.substring(1, tableInfo[j].price.length);
    let productTotal = price * tableInfo[j].quantity;
    totalPrice += productTotal;
    trs[j].cells.item(6).innerHTML = "$" + productTotal;
  }
}

/**
 * If we are increasing the number of a shoes call this method
 * to update the DOM and objects as needed
 *
 * @param {*} i - the ith elemment to add
 */
function setIncreasedValues(i) {
  //getting the table rows
  var trs = document.querySelectorAll("tbody tr");
  //getting the price removing the $ from tableInfo array
  let price = tableInfo[i].price.substring(1, tableInfo[i].price.length);
  //getting the quantity from the table 
  let quantity = Number(trs[i].cells.item(5).innerHTML);
  //getting the old price
  let oldPrice = price * quantity;
  //removing the old price
  totalPrice = totalPrice - oldPrice;
  //incrementing the quantity
  tableInfo[i].quantity++;
  quantity += 1;
  //calculating the price and adding it 
  let newPrice = price * quantity;
  totalPrice += newPrice;
  //adding the new values to the table and setting the price
  trs[i].cells.item(6).innerHTML = "$" + newPrice;
  trs[i].cells.item(5).innerHTML = quantity;
  setTotalPrice();
}

/**
 * If we are removing a value (hitting the trash button) removes the value 
 *
 * @param {*} i - ith element to remove
 */
function removeValue(i) {
  //getting the table 
  var trs = document.querySelectorAll("tbody tr");
  //getting the price and quanity for removal and updating 
  let price = tableInfo[i].price.substring(1, tableInfo[i].price.length);
  let quantity = Number(trs[i].cells.item(5).innerHTML);
  let oldPrice = price * quantity;
  totalPrice = totalPrice - oldPrice;
  //removing it from the table
  document.getElementsByTagName("tr")[i + 1].remove();
  //set the total price
  setTotalPrice();

}

/**
 * If we are decrementing the number of a shoes call this method
 * to update the DOM and objects as needed
 *
 * @param {*} i - ith element to subtract
 */
function setDecreasedValue(i) {
  //getting the table row, quantity and price
  var trs = document.querySelectorAll("tbody tr");
  let price = tableInfo[i].price.substring(1, tableInfo[i].price.length);
  let quantity = Number(trs[i].cells.item(5).innerHTML);
  //getting the old price and updating the total price
  let oldPrice = price * quantity;
  totalPrice = totalPrice - oldPrice;
  //updating values
  tableInfo[i].quantity--;
  quantity -= 1;
  //If we have 0 of an item, we should delete it.
  if(quantity <=0){
    deleteCart(tableInfo[i]);
    removeValue(i);
    return
  }
  //getting the new price
  let newPrice = price * quantity;
  totalPrice += newPrice;
  //updating the table
  trs[i].cells.item(6).innerHTML = "$" + newPrice;
  trs[i].cells.item(5).innerHTML = quantity;
  setTotalPrice();
}

/**
 * Gets the total price and setting it in the dom
 */
function setTotalPrice() {
  document.querySelector("#total-price").innerHTML = "$" + totalPrice;
}



/**
 * REST API method which I use to add a product to the cart and update the DB
 * 
 * @param {*} tableRow - the row we are working with
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

    console.log("Completed!", response);
  } catch (err) {
    //if it is incomplete print the error out for debugging
    console.error(`Error: ${err}`);
  }
}


/**
 * REST API method for deleting a row from the table and updating DB
 * 
 * @param {} tableRow 
 */
async function deleteCart(tableRow) {
  //creating data as a object to Stringify for parsing
  let id = tableRow.id;
  let data = {
    productID: id,
  };
  //trying to send the DELETE request with the required data
  try {
    //async request
    const response = await fetch("/cart/remove/all", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(data),
    });

    console.log("Completed!", response);
    window.location.href=window.location.href
  } catch (err) {
    //if it is incomplete print the error out for debugging
    console.error(`Error: ${err}`);
  }
}
/**
 * Method for decrementing the quantity by one.
 * 
 * @param {} tableRow  - the row we are updating
 */
async function minusOne(tableRow) {

  let id = tableRow.id;
  console.log(id);
  let data = {
    productID: id,
  };
  try {
    //async request
    const response = await fetch("/cart/remove", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(data),
    });
    console.log("Completed!", response);
  } catch (err) {
    //if it is incomplete print the error out for debugging
    console.error(`Error: ${err}`);
  }
}


/**
 * Setting up the event listeners for the table
 */
 function setupEventListenrs() {
  for (let i = 0; i < addButtons.length; i++) {
    //adds a click event listener with the function, and the data it needs
    addButtons[i].addEventListener(
      "click",
      function () {
        incrementCart(tableInfo[i]);
        setIncreasedValues(i);
      },
      false
    );
  }

  for (let i = 0; i < trashButtons.length; i++) {
    //adds a click event listener with the function, and the data it needs
    trashButtons[i].addEventListener(
      "click",
      function () {
        deleteCart(tableInfo[i]);
        removeValue(i);
      },
      false
    );
  }
  for (let i = 0; i < minusButtons.length; i++) {
    //adds a click event listener with the function, and the data it needs
    minusButtons[i].addEventListener(
      "click",
      function () {
        minusOne(tableInfo[i]);
        setDecreasedValue(i);
      },
      false
    );
  }
}

//methods I call originally setup the table, the price, totals for the items and event listeners
setup();
setOriginalTotals();
setTotalPrice();
setupEventListenrs();
