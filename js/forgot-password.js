/**
 * Opens the reset password page for a given email if it exists in the usersjoin array, otherwise redirects to the register page.
 * @param {string} email - The email address to check for resetting the password.
 */

function openResetPassword(email) {
    let resetPasswordOfMail = email.value;
    for (let index = 0; index < usersjoin.length; index++) {
        const element = usersjoin[index];
        const boolregisterEmail = element['usermail'].includes(resetPasswordOfMail);
        if (boolregisterEmail) {
            localStorage.setItem('resetPasswordForUser', resetPasswordOfMail);
            window.location.href = 'resetpassword.html';
            return;
        }
        else {
            window.location.href = 'register.html';
        }
    }
}