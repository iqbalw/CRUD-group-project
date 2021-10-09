/**
 * This is a 
 * 
 * Interesting to note that there is an async tag loaded in head.ejs this is required
 * as without it, the dom will not be loaded and therefore any querySelector or getElementByID
 * will return null even if it does exist after the DOM is parsed. 
 */

let registerCheck = document.getElementById("register");
let passwordField = document.getElementById("password");
let confirmPasswordField = document.getElementById("password-repeat")
passwordField.addEventListener('input', updateValue);
confirmPasswordField.addEventListener('input', updateValue);
let registerButton = document.getElementById("registerbtn");
let confirmPasswordStyling = document.getElementById("confirm-password");



//Checking if we are on the register page as head.ejs which is where the script is loaded from
//is passed through to many different pages, no point running this whole script everytime 
if (registerCheck) {
  registerButton.hidden = true;
  

  

  console.log("We are on the register page");
}

function updateValue () {


 //If the password fields are equal after an update 
 if(passwordField.value === confirmPasswordField.value){
   
   

 }
 else{

 }

}
