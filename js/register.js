// Global variables
let usersjoin = [];
let registerName = document.getElementById('userName');
let registerEmail = document.getElementById('email');
let registerPassword = document.getElementById('password');
let checkboxAlert = document.getElementById("checkboxAlert");
let acronym = '';

/**
 * Toggles the confirmation of a password during user registration.
 * If the entered password matches the confirmation, the signup button is enabled; otherwise, it's disabled.
 */

function toggleConfirmPassword() {
  let signUpBtn = document.getElementById('signUpButton');
  signUpBtn.disabled = true;

  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword");

  if (password === confirmPassword.value) {
    confirmPassword.style.border = "1px solid #ccc";
    document.getElementById("passwordMatchMessage").style.display = "none";
    signUpBtn.disabled = false;
  } else {
    confirmPassword.style.border = "1px solid red";
    document.getElementById("passwordMatchMessage").style.display = "block";
  }
}

/**
 * Registers a user if the registration checkbox is checked and checks for user registration.
 * Displays an alert if the checkbox is not checked.
 * @returns {Promise<void>}
 */

async function registerUser() {
  if (!checkbox.checked) {
    checkboxAlert.style.display = "block";
    return;
  }

  checkboxAlert.style.display = "none";
  checkUserRegistration();
}

/**
 * Checks if a user is already registered by comparing their email with existing user emails.
 * If the user is not registered, adds the user to the local array and updates the storage.
 * Redirects to the login page after registration.
 * @returns {Promise<void>}
 */

async function checkUserRegistration() {
  let userIsAlreadyRegistered = false; 
  let element = '';

  if (usersjoin.length === 0) {
    fillLocalArray();
    await setItem('usersjoin', JSON.stringify(usersjoin));
    window.location.href = "login.html";
  }
  else if (usersjoin.length !== 0) {
    for (let index = 0; index < usersjoin.length; index++) {
      element = usersjoin[index];
      const boolregisterEmail = element['usermail'].includes(registerEmail.value);
      if(boolregisterEmail){
        userIsAlreadyRegistered = true;
      }
    }
    if (!userIsAlreadyRegistered) {
      fillLocalArray();
      await setItem('usersjoin', JSON.stringify(usersjoin));
      window.location.href = "login.html";
    }
    else{
      window.location.href = "login.html";
    }
  }
}

/**
 * Creates an acronym from a full name by using the first letter of the first name
 * and the first letter of the last name (if available).
 *
 * @returns {string} The generated acronym.
 */

function createAcronym(){
  let firstLetterOfFirstName = '';
  let firstLetterOfLastName = '';
  let indexOfEmptySpace = registerName.value.search(' ');
  if(indexOfEmptySpace >0){
      firstLetterOfFirstName = registerName.value.split(" ")[0][0].toUpperCase();
      firstLetterOfLastName = registerName.value.split(" ")[1][0].toUpperCase();
      return firstLetterOfFirstName+firstLetterOfLastName;
  }
  else{
      firstLetterOfFirstName = registerName.value[0];
      return firstLetterOfFirstName;
  }
}

/**
 * Fills the 'usersjoin' local array with user information based on the provided
 * registration data, including username, email, and password. It also generates
 * a user acronym based on the username.
 */

function fillLocalArray() {
  usersjoin.push({
    useracronym: createAcronym(),
    username: registerName.value,
    usermail: registerEmail.value,
    userpassword: registerPassword.value
  });
}

/**
 * Toggles the visibility of the password input field. Changes the input type
 * between 'password' (hidden) and 'text' (visible) and updates the lock icon.
 */

function showPassword() {
  let passwordInput = document.getElementById("password");
  let lockIcon = document.getElementById("lock-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    lockIcon.src = "assets/img/visible.png";
  } else {
    passwordInput.type = "password";
    lockIcon.src = "assets/img/hide.png";
  }
}

/**
 * Toggles the visibility of the confirm password input field. Changes the input type
 * between 'password' (hidden) and 'text' (visible) and updates the lock icon.
 */

function showConfirmPassword() {
  let passwordInput = document.getElementById("confirmPassword");
  let lockIcon = document.getElementById("confirm-lock");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    lockIcon.src = "assets/img/visible.png";
  } else {
    passwordInput.type = "password";
    lockIcon.src = "assets/img/hide.png";
  }
}