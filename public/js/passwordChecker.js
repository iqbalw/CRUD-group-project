/**
 * This is a script which is used by the register.ejs code to verify if a password is
 * complex as well as provide visual feedback for this. 
 *  
 * 
 * Interesting aside to note that there is an async tag loaded in head.ejs this is required
 * as without it, the dom will not be loaded and therefore any querySelector or getElementByID
 * will return null even if it does exist after the DOM is parsed. 
 */


/**
 * Check to see if we are on the register page and if so hide the register page until we 
 * have a complex enough of password
 */
let registerPageCheck = document.getElementById("register");

/**
 * Variable used to get the characters inside the password field within the form. 
 */
let passwordField = document.getElementById("password");




/**
 * Variable used to get the characters inside the confirm password field within the form
 */
let confirmPasswordField = document.getElementById("password-repeat")

/**
 * Adding a password event listener which fires checkPasswords method to
 * verify if the password and confirm passwords are satisfactory based on the input. 
 */
 passwordField.addEventListener('input', checkPasswords);
confirmPasswordField.addEventListener('input', checkPasswords);

/**
 * The register button which is set to hidden until the password is satisfactory
 */
let registerButton = document.getElementById("registerbtn");

/**
 * References to the password and confirm-password label which are altered based
 * on the passwords provided 
 */
let passwordLabel = document.getElementById("password-label");
let passwordConfirmLabel = document.getElementById("confirm-password-label");


//setting the register button to hidden, only to be set to false once we have a strong password.
registerButton.hidden = true;

/**
 * 
 * Method which checks the passwords to verify if they are valid and only if they are
 * unhide the register button
 * 
 */
function checkPasswords () {

  //Regex for password. Checks if password between 7 to 15 characters which contain at least one numeric digit and a special character
  var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  //Originally the password strength is not good and weak therefore this is false
  let passwordStrengthIsGood = false;

  //If the password field's length is less than 7, no point going further
  //replace label text with message showing this along with red warning text.
  if(passwordField.value.length < 7){
    console.log("Password is too small ");
    passwordLabel.textContent = "Password is too short needs to be 7 characters"
    passwordLabel.style.color = "red"
    return;
  }
  //If the password's value matches the regex e.g password123@ then, set the 
  //label message to the "Password is strong " along with green coloring
  if(passwordField.value.match(paswd)){
      passwordLabel.textContent = "Password is strong"
      passwordLabel.style.color = "green"
      passwordStrengthIsGood = true;
  }
  //Send a orange message indicating that there should be improvements.
  else {
    passwordLabel.textContent = "Password should contain a special character, a numeric character and be at least 7 characters long";
    passwordLabel.style.color = "orange"
    return;
  }

 //If the password fields are equal after an update and it is a strong password
 //Return the labels to their original message and unhide the button 
 if(passwordField.value === confirmPasswordField.value && passwordStrengthIsGood ){
  passwordLabel.textContent = "Password"
  passwordConfirmLabel.textContent = "Confirm password"
  registerButton.hidden = false;
  passwordConfirmLabel.style.color = "black";

 }
//If we get this far with all of the checks only logical answer would be the passwords 
//do not match
 else{
  passwordConfirmLabel.textContent = "Passwords do not match";
  passwordConfirmLabel.style.color = "red";
 }

}
