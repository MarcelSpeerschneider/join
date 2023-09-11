function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user=users.find(u => u.email==email.value && u.password == password.value);
  if(user){
    console.log('user gefunden')
  }else{
    alert('Register if you are not a user yet');
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


