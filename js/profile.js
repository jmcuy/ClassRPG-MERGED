

function show_profile(){
    let prof_parent = document.getElementsByClassName("prof-container")[0];
    prof_parent.innerHTML = "<h5 class='text-info'>Avatar:<h5> not yet" + 
    "<br><h5 class='text-info'>Full name:</h5> " + prof_info[0].name +
    "<br><h5 class='text-info'>Course:</h5> " + prof_info[0].course +
    "<br><h5 class='text-info'>Department:</h5> " + prof_info[0].department +
    "<br><h5 class='text-info'>SAIS ID:</h5> " + prof_info[0].sais +
    "<br><h5 class='text-info'>Email:</h5> " + prof_info[0].email + "<br><br>"

    // console.log(prof_info)
    
}


function submit() {
    let name = document.getElementById("fname").value;
    let course = document.getElementById("course").value;
    let department = document.getElementById("department").value;
    let sais = document.getElementById("sais").value;

    updateProfile(name, course, department,sais)
    window.alert("Form Submitted!");
    location.reload()
}




function updateProfile(name, course, department,sais){
    user_ref.child(user_token).update({
        fullname:name,
        course: course,
        department:department,
        sais:sais,
    }).then(()=>{
        alert("done")
    });
}
document.getElementById("profile-form").style.display = "none";

function editProfile() {
    var x = document.getElementById("profile-form");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}