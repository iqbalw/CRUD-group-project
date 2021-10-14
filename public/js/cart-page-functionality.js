let productTable = document.getElementsByTagName("tbody");
let totalPrices = [];
let tableInfo = []
var addButtons = document.getElementsByClassName("fas fa-plus mr-2"); //returns a nodelist
var trashButtons = document.getElementsByClassName("fas fa-trash"); //returns a nodelist
var minusButtons = document.getElementsByClassName("fas fa-minus mr-2"); //returns a nodelist


let totalPrice = 0


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
        quantity: trs[j].cells.item(5).innerHTML
      }
      tableInfo.push(rowObject)
  }
}

/**
 * Goes through rows and sets the totals as well 
 * as add to totalPrice which is the sum of all the prices 
 */
function setOriginalTotals() {
    var trs = document.querySelectorAll("tbody tr")
  
    for (let j = 0; j < trs.length; j++) {
        let price = tableInfo[j].price.substring(1,tableInfo[j].price.length);
        let productTotal = price* tableInfo[j].quantity
        totalPrice +=productTotal
        trs[j].cells.item(6).innerHTML = "$" +productTotal
  }
}

/**
 * If we are increasing the number of a shoe call this method
 * to update the DOM and objects as needed
 * 
 * @param {*} i - element to add
 */
function setIncreasedValues(i) {
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
setOriginalTotals()

setTotalPrice();
setupEventListenrs()

/**
 *
 * @param {*} name
 */
async function incrementCart(tableRow) {
  //creating data as a object to Stringify for parsing
  let id = tableRow.id;
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


function setupEventListenrs(){
    for (let i = 0; i < addButtons.length; i++) {
        //adds a click event listener with the function, and the data it needs
        addButtons[i].addEventListener(
          "click",
          function () {
            incrementCart(tableInfo[i])
            setIncreasedValues(i)
          },
          false
        );
      }

      for (let i = 0; i < trashButtons.length; i++) {
        //adds a click event listener with the function, and the data it needs
        trashButtons[i].addEventListener(
          "click",
          function () {
            deleteCart(tableInfo[i])
            // incrementQuantity(i)
          },
          false
        );
      }
      for (let i = 0; i < minusButtons.length; i++) {
        //adds a click event listener with the function, and the data it needs
        minusButtons[i].addEventListener(
          "click",
          function () {
            minusOne(tableInfo[i])
            // incrementQuantity(i)
          },
          false
        );
      }
    }

    async function deleteCart(tableRow) {
        //creating data as a object to Stringify for parsing
        let id = tableRow.id;
        console.log(id);
        let data = {
          productID: id,
        };
        //trying to send the post request with the required data
        try {
          //async request
          const response = await fetch("/cart/remove/all", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: JSON.stringify(data),
          });
          //if it is completed print this out for debugging
          //   alert(`${shoeName} was added to cart!`)
          console.log("Completed!", response);
          window.location.href=window.location.href
        } catch (err) {
          //if it is incomplete print the error out for debugging
          console.error(`Error: ${err}`);
        }
      }

      async function minusOne(tableRow) {
        //creating data as a object to Stringify for parsing
        console.log("THIS IS CALLED");
        let id = tableRow.id;
        console.log(id);
        let data = {
          productID: id,
        };
        //trying to send the post request with the required data
        try {
          //async request
          const response = await fetch("/cart/remove", {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            redirect: 'follow',
            body: JSON.stringify(data),
          });
          //if it is completed print this out for debugging
          //   alert(`${shoeName} was added to cart!`)
          console.log("Completed!", response);
          window.location.href=window.location.href
        } catch (err) {
          //if it is incomplete print the error out for debugging
          console.error(`Error: ${err}`);
        }
      }

