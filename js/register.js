let usersjoin = [];
let registerName = document.getElementById('userName');
let registerEmail = document.getElementById('email');
let registerPassword = document.getElementById('password');
let checkboxAlert = document.getElementById("checkboxAlert");

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
  checkUser();
}

async function checkUser() {
  // await loadUsers();
  debugger;
  if (usersjoin.length === 0) {
    fillLocalArray();
  }
  if (usersjoin.length !== 0) {
    for (let index = 0; index < usersjoin.length; index++) {
      const element = usersjoin[index];
      const boolregisterEmail = element['usermail'].includes(registerEmail.value);
      if (boolregisterEmail) {
        alert('User existiert bereits');
        return;
      }
      else if (!boolregisterEmail) {
        fillLocalArray();
        await setItem('usersjoin', JSON.stringify(usersjoin));
        alert('User wurde angelegt');
        window.location.href = "login.html";
        return;
      }
    }
  }
}

function fillLocalArray() {
  usersjoin.push({
    username: registerName.value,
    usermail: registerEmail.value,
    userpassword: registerPassword.value
  });
}


function addUser() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let checkbox = document.getElementById("checkbox");
  let checkboxAlert = document.getElementById("checkboxAlert");

  if (!checkbox.checked) {
    checkboxAlert.style.display = "block";
    return;
  }

  checkboxAlert.style.display = "none";

  usersjoin.push({ email: email.value, password: password.value });
  window.location.href = "login.html";
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