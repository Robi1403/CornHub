import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail  } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js';
import { getDatabase, ref, set  } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js';

//things need to connect to the firebase database
const firebaseConfig = {
    apiKey: "AIzaSyAeS_X_nCDZ3AJZPbfyf7xXnwUQyjF0wnU",
    authDomain: "corn-hub-774a9.firebaseapp.com",
    databaseURL: "https://corn-hub-774a9-default-rtdb.firebaseio.com",
    projectId: "corn-hub-774a9",
    storageBucket: "corn-hub-774a9.appspot.com",
    messagingSenderId: "423151789842",
    appId: "1:423151789842:web:3f4e735a7272db954575cb",
    measurementId: "G-6D3NN3YNPW"
};

//initialization of variables
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const database = getDatabase();


let ERROR = "";


//function where user login
window.login = function(e){
  e.preventDefault(e);
  var email = document.getElementById('Email').value;
  var password = document.getElementById('Password').value;
  
    //firebase built in function to log user if it match in the database
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'Home.html';
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      const errorPrompt = `<div class="errorContainer">
    <p>${errorMessage}</p>
    <img src="imageAssets/ic_round-warning.png" alt="">
    </div>`
    ERROR = errorPrompt;
    document.querySelector('.error').innerHTML = ERROR;
    });
}


//back to log in button
window.backTologin = function(){
  window.location.href = 'Login.html';
}

// a button that show the hidden forgot password divs
window.forgotPassword = function(){
  sent.style.display = 'none'
  forgotPassId.style.display = 'flex'
  error.style.display ='none';
}

// when user submits his email for password reset
window.submitted = function(){
  var email = document.getElementById('emailFP').value;
  
  sendPasswordResetEmail(auth, email)
  .then(() => {
    ForgotpassPrompt.style.display = 'none'
    sent.style.display = 'flex'
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

//function where user is  registered and saved to the database
window.register = function(e){
  e.preventDefault(e);

  var fname = document.getElementById('fname').value
  var lname = document.getElementById('lname').value
  var email = document.getElementById('email').value
  var password = document.getElementById('password').value


  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
    const uid = user.uid;
    //saves the data in the database
    set(ref(database, 'users/' + uid), {
    fname: fname,
    lname : lname,
    email : email,
  })
    error.style.display ='none';
    successMessageSignup.style.display ='flex';    
  })
  .catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    //shows the error message
    const errorPrompt = `<div class="errorContainer">
    <p>${errorMessage}</p>
    <img src="imageAssets/ic_round-warning.png" alt="">
    </div>`

    ERROR = errorPrompt;
    document.querySelector('.error').innerHTML = ERROR;

  });
}
