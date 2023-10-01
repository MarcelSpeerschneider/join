/**
 * Authenticates a user by checking if the provided email and password match any entries in the usersjoin array.
 * Redirects to the index page and sets local storage values if authentication is successful; otherwise, displays an error alert.
 */

async function login() {
  let username = document.getElementById('email');
  let password = document.getElementById('password');
  let boolEmail = false;
  let boolPassword = false;

  if (usersjoin.length !== 0) {
    for (let index = 0; index < usersjoin.length; index++) {
      const element = usersjoin[index];
      boolEmail = element['usermail'].includes(username.value);
      boolPassword = element['userpassword'].includes(password.value);
      if (boolEmail && boolPassword) {
        window.location.href = "./index.html";
        localStorage.setItem('username', element['username']);
        localStorage.setItem('acronym', element['useracronym']);
        return;
      }
    }
  }
  if (!boolEmail | !boolPassword) {
    alert('Username or Password incorrect!');
  }
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon.
 */

function showPassword() {
  let passwordInput = document.getElementById("password");
  let lockIcon = document.getElementById("lock-icon");

  if (passwordInput.type === "password") {
    // Change the input type to "text" to show the password in plain text.
    passwordInput.type = "text";
    // Update the icon to indicate that the password is visible.

    lockIcon.src = "assets/img/visible.png";
  } else {
    // Change the input type back to "password" to mask the characters.
    passwordInput.type = "password";
    // Update the icon to indicate that the password is hidden.
    lockIcon.src = "assets/img/hide.png";
  }
}

/**
 * Sets the user's acronym in HTML elements.
 * @param {number} size - The size of the acronym.
 */

function setAcronym(size) {
  document.getElementById('useracronym').innerHTML = localStorage.getItem('acronym');
  document.getElementById('useracronym-mobile').innerHTML = localStorage.getItem('acronym');
}

/**
 * Set local storage items for a guest user.
 */

function guestLocalStorageInfo() {
  localStorage.setItem('username', 'Guest');
  localStorage.setItem('acronym', 'GU');
}