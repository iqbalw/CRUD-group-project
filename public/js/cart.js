//Getting all the cards values
var cards = document.getElementsByClassName("col-lg-3 text-center py-5"); //returns a nodelist
var buttons = document.getElementsByTagName("button"); //returns a nodelist

console.log(buttons.length);
/**
 * Adding event listeners to all of the buttons, so that on a click event
 * each indivdual button is able to add their item to the cart
 *
 * No hardcoding and will be able to handle reloading.
 */
function addEventListeners () {
  console.log("CALLED");
  console.log(buttons.length);
  for (let i = 0; i < buttons.length; i++) {
    //adds a click event listener with the function, and the data it needs
    console.log("WE HERE");
    buttons[i].addEventListener(
      "click",
      function () {
        console.log("CLICKED");
        addToCart(cards[i]);
      },
      false
    );
  }
}

addEventListeners()


/**
 * Add to cart method which creates a POST request that is handled
 * by the middleware in cartController.js. This method sends a request to
 * /cart/add with the productID of the item selected to the cart and onCartPage being false
 * as we are on the index page.
 *
 * * @param {*} cardInfo - the card we need to extract information from
 * 
 */
async function addToCart(cardInfo) {
  //creating data as a object to Stringify for parsing
  let shoeName = cardInfo.querySelector("#productname").innerHTML;
  let data = {
    productID: cardInfo.id,
    onCartPage: false,
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
    alert(`${shoeName} was added to cart!`)
    console.log("Completed!", response);
  } catch (err) {
    //if it is incomplete print the error out for debugging
    console.error(`Error: ${err}`);
  }
}
