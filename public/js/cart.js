
//Getting all the cards values
var cards = document.getElementsByClassName("col-lg-3 text-center py-5"); //returns a nodelist
var buttons = document.getElementsByTagName("button"); //returns a nodelist

for (let i = 0; i < buttons.length; i++) {
  buttons.objData = cards[i];
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener(
    "click",
    function () {
      buttonsControl(this, cards[i], i);
    },
    false
  );
}

async function buttonsControl(button, cards, i) {

  let data = {
   productID: cards.id,
   onCartPage: false,
  }
  try {
    const response = await fetch("/cart/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    console.log("Completed!", response);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function cardControl(button, i) {
  console.log(button);
}
