const db = firebase.firestore();

const form = document.querySelector('#signup-form');
var firebase = app_fireBase;
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uid = null;
var currentUserEmail;
var flag = 0;

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
currentUserEmail = firebase.auth().currentUser.email;
console.log(currentUserEmail);
currentUserEmailText.innerHTML = currentUserEmail;
    // User is signed in.
  }else{
  	//redirect to log in page
  	window.location.replace("/index.html");
  }
});

var currentUserEmailText = document.getElementById("currentUserEmail1");
//saving data
form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	db.collection('users').add({
    FirstName: form.firstName.value,
    LastName: form.lastName.value,
    DisplayName: form.displayName.value,
		SaisID: form.saisId.value,
		UserType: form.class.value,
    College: form.legion.value,
		Course: form.guild.value,
		Email: currentUserEmail
	});

	db.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          var email = doc.data().Email;
          if(email == currentUserEmail){
          console.log(email);
          console.log(currentUserEmail);
          var saisID = doc.data().SaisID; 
          console.log(saisID);
          if(saisID != ""){
          window.location.replace("../html/home-teacher.html");
          console.log("valid");
          flag = 1;
          }
        }
        });
        if(flag == 0){
          window.location.replace("../html/register.html");
        }
      }); 
});


