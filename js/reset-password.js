/**
 * Toggles the confirmation of a password during user registration.
 * If the entered password matches the confirmation, the signup or confirm button is enabled; otherwise, it's disabled.
 */

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

/**
 * This function checks whether an useraccount exists and set a new Password
 * 
 * @returns - the return stops the foor loop.
 */
async function checkPasswordsAndRedirect() {
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let usermail = localStorage.getItem('resetPasswordForUser');

  if (password === confirmPassword) {

    for (let index = 0; index < usersjoin.length; index++) {
      const element = usersjoin[index];
      let boolUserCheck = element['usermail'].includes(usermail);
      if(boolUserCheck){
        element['userpassword']=`${password}`;
        await setItem('usersjoin', JSON.stringify(usersjoin));
        window.location.href = "login.html";
        return;
      }
    }
  } else {
    document.getElementById("passwordMatchMessage").style.display = "block";
  }
}