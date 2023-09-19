async function login() {
  let username = document.getElementById('email');
  let password = document.getElementById('password');
  if (usersjoin.length !== 0) {
    for (let index = 0; index < usersjoin.length; index++) {
      const element = usersjoin[index];
      const boolEmail = element['usermail'].includes(username.value);
      const boolPassword = element['userpassword'].includes(password.value);
      if (boolEmail & boolPassword) {
        window.location.href = "assets/templates/template.html";
        return;
      }
    }
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
