firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    let user = firebase.auth().currentUser;

    if(user !== null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    

  }
});

function login(){

  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    // eslint-disable-next-line no-alert
    window.alert("Error : " + errorMessage);

    // ...
  });

}


function logout(){
  firebase.auth().signOut();
}
