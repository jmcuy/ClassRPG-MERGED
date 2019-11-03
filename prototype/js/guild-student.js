exports.validation = function(guild_ref,key){
    for(let i = 0; i < guild_ref.keys.length;i++){
        if(guild_ref.keys[i] == key){
            return true
        }
    }
    return false
}

function validation(key) { // checks if enrollment key exist
    if(typeof temp !== "undefined" ){
        for(let i = 0; i < temp.length;i++){               
            if(temp[i].id == key){
                alert("added")
                enrolled_ref.child(user_token).child(key).set({ //add to database
                    name: temp[i].name.toUpperCase()
                });
                location.reload();
                return;
            }
        }
        alert("nonexistent")
    } else {
        console.log("unde")
    }
}

function submit(id) {
    if(id == 'guild_key'){
        let guild_key = document.getElementById("guild_key").value
        validation(guild_key);    
    } 
}


function dispSubject(){ //displays enrolled subjects
    let pcontainer = document.getElementsByClassName("sub-container")[0]
    pcontainer.innerHTML = "";
    if(typeof student_load !== "undefined" ){
        for(let i = 0; i < student_load.length;i++){
            let sub_child = document.createElement("button");
            let sub_name = student_load[i].name;

            sub_child.addEventListener("click", function(){
                alert("redirecting")
                window.location.href = "./guild-mission.html" + "?/" + sub_name.replace(" ","%");
            });
            
            sub_child.innerHTML = "<h4>"+ sub_name +" </h4>";
            pcontainer.appendChild(sub_child);
        }
    } else {
        console.log("unde")
    }
    
   
}
