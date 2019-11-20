var mainApp = {};
(function(){  
	var firebase = app_fireBase;
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
	var uid = null;
  var currentUserEmail;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
currentUserEmail = firebase.auth().currentUser.email;
console.log(currentUserEmail);
currentUserEmailText.innerHTML = currentUserEmail;
  }else{
  	//redirect to log in page
  	window.location.replace("home-teacher.html");
  }
});

var currentUserEmailText = document.getElementById("currentUserEmail1");

function logOut(){
	firebase.auth().signOut();
}

	mainApp.logOut = logOut;
})()