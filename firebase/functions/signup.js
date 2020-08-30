

function signup(){
  let firebaseConfig = {
            apiKey: "AIzaSyDPHPnY-OEUMQ_79r2eFmrSOPN5Ajc-7K0",
            authDomain: "sacnnershop.firebaseapp.com",
            databaseURL: "https://sacnnershop.firebaseio.com",
            projectId: "sacnnershop",
            storageBucket: "sacnnershop.appspot.com",
            messagingSenderId: "743639413044",
            appId: "1:743639413044:web:f7010c06eb14558a79b561",
            measurementId: "G-0DCJTMZR0J"
          };
  let secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");       
  let uid = firebase.auth().currentUser.uid;
  console.log(uid);
  let accountCreated = true;
  let userEmail = document.getElementById("email_field").value;
  let userPass = document.getElementById("password_field").value;
  let userPass2 = document.getElementById("password_field2").value;
  if (userEmail === null || userPass === null){
      // eslint-disable-next-line no-alert
      window.alert('missing credentials');

      accountCreated = false;
      secondaryApp.delete();
  }
  if (userPass === userPass2 ){
    
    secondaryApp.auth().createUserWithEmailAndPassword(userEmail, userPass).then((data) => {
      // eslint-disable-next-line no-alert
      window.alert("Created new user success!")
      secondaryApp.auth().signOut();
      secondaryApp.delete();
      window.location.href = 'login';
      return true;
    }
    ).catch((error) => {
    // Handle Errors here.
    secondaryApp.delete();
    let errorCode = error.code;
    let errorMessage = error.message;

    accountCreated = false;
    // eslint-disable-next-line no-alert
    window.alert("Error : " + errorMessage);
    console.log(accountCreated);

    });
  }
  else{
    // eslint-disable-next-line no-alert
    window.alert("Error : passwords not match!");
    secondaryApp.delete();
  }
  
  
}