// Global variables
let usersjoin = [];
let registerName = document.getElementById('userName');
let registerEmail = document.getElementById('email');
let registerPassword = document.getElementById('password');
let checkboxAlert = document.getElementById("checkboxAlert");
let acronym = '';

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

async function registerUser() {
  if (!checkbox.checked) {
    checkboxAlert.style.display = "block";
    return;
  }

  checkboxAlert.style.display = "none";
  checkUserRegistration();
}

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

function createAcronym(){
  debugger;
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

function fillLocalArray() {
  usersjoin.push({
    useracronym: createAcronym(),
    username: registerName.value,
    usermail: registerEmail.value,
    userpassword: registerPassword.value
  });
}

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