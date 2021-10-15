window.addEventListener("load", init);
function init() {
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
  if (document.querySelector("#displayImage")) { document.querySelector("#displayImage").remove(); }

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

  // Check if a product has been selected
  if (productId != "Select a product to modify") {
    // When product is deleted show a message to the user
    document.getElementById("pageMessage").innerHTML = `
        <div id="currentProduct" class="alert alert-success" role="alert">
        Successfully <strong>deleted</strong> product "${productName}".
        </div>
        `;

    fetch("/products/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id: productId,
      }),
    }).then((res) => console.log(res.json));
  } else {
    document.getElementById("pageMessage").innerHTML = `
  <div id="currentProduct" class="alert alert-secondary" role="alert">
  Please select a product to modify.
  </div>
  `;
  }

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

  // Check if a product has been selected
  if (productId != "Select a product to modify") {
    // When product is updated show a message to the user
    document.getElementById("pageMessage").innerHTML = `
        <div id="currentProduct" class="alert alert-success" role="alert">
        Successfully <strong>updated</strong> product "${productName}".
        </div>
        `;

    // Construct form data
    const fd = new FormData();
    fd.append("_id", productId);
    fd.append("name", document.getElementById("name").value);
    fd.append("description", document.getElementById("desc").value);
    fd.append("price", parseFloat(document.getElementById("price").value));
    // new image file supplied send for update
    const input = document.querySelector('#productImage');
    if (input.files[0]) { fd.append("productImage", input.files[0]); }

    fetch("/products/edit", {
      method: "PUT",
      body: fd
    }).then((res) => console.log(res.json));
  } else {
    document.getElementById("pageMessage").innerHTML = `
    <div id="currentProduct" class="alert alert-secondary" role="alert">
    Please select a product to modify.
    </div>
    `;
  }

  //clear form
  clearAll();
}

/**
 * Helper function to fill the form with the selected product values
 */
function fillForm() {
  console.log("Filling form with selection test");

  // Remove img element if it exists
  if (document.querySelector("#displayImage")) { 
    console.log('Found Img'); 
    document.querySelector('#displayImage').remove();
  }

  //Get product id from dropdown
  let productId = document.getElementById("productselection").value;
  console.log("id = " + productId);

  if (productId != "Select a product to modify") {
    //retrieve the product item first (GET request)
    fetch("/products/" + productId)
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

          // Display product image if exists
          if (item.productImage) {
            const img = document.createElement("img");
            img.setAttribute("src", item.productImage);
            img.setAttribute("id", "displayImage");
            img.setAttribute("width", "20%");
            img.setAttribute("height", "20%");

            document.getElementById("currentImage").appendChild(img);
          }

        });
      });
  }
}
