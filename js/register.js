let users = [{ email: "test@gmail.com", password: "test123" }];

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

  users.push({ email: email.value, password: password.value });
  window.location.href = "login.html";
}

function toggleConfirmPassword() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword");

  if (password === confirmPassword.value) {
    confirmPassword.style.border = "1px solid #ccc";
    document.getElementById("passwordMatchMessage").style.display = "none";
  } else {
    confirmPassword.style.border = "1px solid red";
    document.getElementById("passwordMatchMessage").style.display = "block";
  }
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




