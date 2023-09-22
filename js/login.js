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
        window.location.href = "assets/templates/template.html";
        localStorage.setItem('username', element['username']);
        localStorage.setItem('acronym',element['useracronym']);
        return;
      }
    }
  }
  if(!boolEmail | !boolPassword){
    alert('Username or Password incorrect!');
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

function setAcronym(){
  document.getElementById('useracronym').innerHTML = localStorage.getItem('acronym');
}

function guestLocalStorageInfo(){
  localStorage.setItem('username','Guest');
  localStorage.setItem('acronym','GU');
}