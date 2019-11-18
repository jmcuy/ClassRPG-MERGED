const db = firebase.firestore();

const form = document.querySelector('#signup-form');
var firebase = app_fireBase;
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uid = null;
var currentUserEmail;

/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
currentUserEmail = firebase.auth().currentUser.email;
console.log(currentUserEmail);
    // User is signed in.
  }else{
  	//redirect to log in page
  	window.location.replace("login.html");
  }
});*/

//saving data
form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	db.collection('users').add({
		SaisID: form.saisId.value,
		UserType: form.userType.value,
		FirstName: form.firstName.value,
		LastName: form.lastName.value,
		Course: form.course.value,
		Year: form.year.value,
		Email: currentUserEmail
	});
});

