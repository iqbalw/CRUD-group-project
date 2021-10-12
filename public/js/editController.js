window.addEventListener("load", init);
function init() {
  console.log("running init...");
  clearAll();
  bindEvents();
}

/**
 * Clears all form data
 */
function clearAll() {
  /* This function clears the contents of the form except */
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("desc").value = "";
}

/**
 * Binds page objects to js functions
 */
function bindEvents() {
  document.querySelector("#delete").addEventListener("click", deleteRecord);
  document.querySelector("#update").addEventListener("click", updateRecord);
  document
    .querySelector("#productselection")
    .addEventListener("change", fillForm);
}

/**
 * Deletes a record using the form values
 */
function deleteRecord() {
  console.log("Deleting record");

  //Get product id from dropdown
  let select = document.getElementById("productselection");
  let productId = select.options[select.selectedIndex].value;
  let productName = select.options[select.selectedIndex].text;
  console.log("id = " + productId);
  console.log("name = " + productName);

  document.getElementById("pageMessage").innerHTML = `
        <div id="currentProduct" class="alert alert-success" role="alert">
        Successfully <strong>deleted</strong> product "${productName}".
        </div>
        `;

  fetch("http://localhost:3000/products/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id: productId,
    }),
  }).then((res) => console.log(res.json));

  //clear form
  clearAll();
}

/**
 * Updates the selected product using the form values
 */
function updateRecord() {
  //Get product id from dropdown
  let select = document.getElementById("productselection");
  let productId = select.options[select.selectedIndex].value;
  let productName = select.options[select.selectedIndex].text;
  console.log("id = " + productId);
  console.log("name = " + productName);

  document.getElementById("pageMessage").innerHTML = `
      <div id="currentProduct" class="alert alert-success" role="alert">
      Successfully <strong>updated</strong> product "${productName}".
      </div>
      `;

  fetch("http://localhost:3000/products/edit", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      _id: productId,
      name: document.getElementById("name").value,
      description: document.getElementById("desc").value,
      price: parseFloat(document.getElementById("price").value),
    }),
  })
    .then((res) => console.log(res.json))

  //clear form
  clearAll();
}

/**
 * Helper function to fill the form with the selected product values
 */
function fillForm() {
  console.log("Filling form with selection");

  //Get product id from dropdown
  let productId = document.getElementById("productselection").value;
  console.log("id = " + productId);

  if (productId != "Select a product to modify") {
    //retrieve the product item first (GET request)
    fetch("http://localhost:3000/products/" + productId)
      .then((res) => res.json())
      .then((data) => {
        //populate form
        data.forEach((item) => {
          //change current product label
          document.getElementById("pageMessage").innerHTML = `
          <div id="currentProduct" class="alert alert-primary" role="alert">
          Modifying product "${item.name}".
          </div>
          `;

          //form values
          document.getElementById("name").value = item.name;
          document.getElementById("price").value = item.price;
          document.getElementById("desc").value = item.description;
        });
      });
  }
}
