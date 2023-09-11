function openLoginHTML() {
  window.location.href = "login.html?";
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

function toggleConfirmPassword() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword");

  if (password === confirmPassword.value) {
    confirmPassword.style.border = "1px solid transparent";
    document.getElementById("passwordMatchMessage").style.display = "none";
  } else {
    confirmPassword.style.border = "1px solid red";
    document.getElementById("passwordMatchMessage").style.display = "block";
  }
}

function checkPasswordsAndRedirect() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  if (password === confirmPassword) {
    window.location.href = "login.html";
  } else {
    document.getElementById("passwordMatchMessage").style.display = "block";
  }
}
