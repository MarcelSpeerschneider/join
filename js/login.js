function login() {
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let user=users.find(u => u.email==email.value && u.password == password.value);
  console.log(user);
  if(user){
    console.log('user gefunden')
  }else{
    alert('Register if you are not a user yet');
}
}
