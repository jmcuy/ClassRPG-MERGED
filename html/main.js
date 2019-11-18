var mainApp = {};

(function(){
	var firebase = app_fireBase;
	var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  }else{
  	//redirect to log in page
  	window.location.replace("login.html");
  }
});

function logOut(){
	firebase.auth().signOut();
}

	mainApp.logOut = logOut;
})()