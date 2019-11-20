
document.getElementById("access-key").style.display = "none";
let start = location.href.lastIndexOf("/");
let guild_course = location.href.substr(start + 1).replace("%", " ");
let guild_key = guild_course.replace(" ", "").toLowerCase() + "id";

document.getElementById("course-code").innerHTML = "Guild Mission " + guild_course;
//-----------------------------DISPLAY SECTION------------------------------------
/////////LISTEN to DISPLAY////////////////////////////
///////////////////QUIZZES///////////////////////////
quiz_ref.once("value", function(snapshot){
    count = 1;
    let q_count = 0;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("quiz");
            childsnapshot.forEach(function(childe){
                // console.log(childe.key)
                let b = document.createElement("button");
                b.innerHTML = "quiz" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "view-mission", childe.child("SubTopics"), childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
               
                childe.child("SubTopics").forEach(function(topics){ //to display SubTopics later
                    console.log(topics.key);
                    q_count += parseInt(topics.child("xp").val());
                });
                
               
            }); 
        }
    });
    
    let total_div = document.createElement("div");
    total_div.innerHTML = "<br>QUIZ TOTAL: " + q_count;
    document.body.appendChild(total_div);

    average(q_count)
});
/////////////////LAB ACTIVITIES///////////////////
lab_ref.once("value", function(snapshot){
    count = 1;
    let l_count = 0;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("labs");
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.innerHTML = "lab" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "lab-view", childe.child("SubTopics"), childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
               
                childe.child("SubTopics").forEach(function(topics){ //to display SubTopics later
                    console.log(topics.key);
                    l_count += parseInt(topics.child("xp").val());
                });
                
               
            }); 
        }
    });
    
    let total_div = document.createElement("div");
    total_div.innerHTML = "<br>LAB TOTAL: " + l_count;
    document.body.appendChild(total_div);
    average(l_count)
});
////////////////////////EXAMS////////////////////////////////
exam_ref.once("value", function(snapshot){
    count = 1;
    let e_count = 0;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("exams");
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.innerHTML = "exam" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "exam-view", childe.child("SubTopics"), childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
               
                childe.child("SubTopics").forEach(function(topics){ //to display SubTopics later
                    console.log(topics.key);
                    e_count += parseInt(topics.child("xp").val());
                });
                
               
            }); 
        }
    });
    
    let total_div = document.createElement("div");
    total_div.innerHTML = "<br>EXAM TOTAL: " + e_count;
    document.body.appendChild(total_div);

    //DISPLAY OVERALL TOTAL
    let overall = document.createElement("div");
    overall.innerHTML ="<br>OVERALL XP: " + average(e_count);
    document.body.appendChild(overall);
});
//--------------------------------------------------------------------//
function showAct(act_id, container_id, subtopics, date, act_name){
    var x = document.getElementById(container_id);
    x.innerHTML = "<br>Name: " +  act_name + "<br>Date: " + date;
    var subs = document.createElement("div");
    subs.innerHTML = "<h4>SubTopics:</h4>";
    subtopics.forEach(function(topic){
        subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: " + topic.child("xp").val() + "<br>";
        x.appendChild(subs) 
    });
    var input = document.createElement("button");
    var record = document.createElement("button")
    input.innerHTML = "Input XP";
    input.addEventListener("click",function(){
        if(container_id == "view-mission"){
            location.href = "input-xp.html?type=quiz?/id="+ act_id+ "?/" + guild_key;
        } else {
            location.href = "input-xp.html?type=" + container_id.substr(0,container_id.lastIndexOf("-"))
             + "?/"+ guild_key;
        }
        
        // location.href = "input-xp.html?/" + guild_key;
    });
    record.innerHTML = "See Records";
    record.addEventListener("click",function(){
        if(container_id == "view-mission"){
            location.href = "view-records.html?type=quiz?/id="+ act_id+ "?/" + guild_key;
        } else {
            location.href = "view-records.html?type=" + container_id.substr(0,container_id.lastIndexOf("-"))
             + "?/"+ guild_key;
        }
        
    });
    x.innerHTML += "<br>";
    x.appendChild(input);
    x.appendChild(record);
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

let t = 0;
function average(count){
    t += count;
    return t;
}

function viewAccessKey() {
    var x = document.getElementById("access-key");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

document.getElementById("view-mission").style.display = "none";

function viewMission() {
    var x = document.getElementById("view-mission");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
function expand(){
    var x = document.getElementById("add_quiz");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}



function addActivity(){ //must assum that quiz id is randomized
    let act = document.getElementById("activity_type");
    let gtype = act.options[act.selectedIndex].value;
    let date = document.getElementById("date").value;
    let name = document.getElementById("qtitle").value;
    //THIS NEEDS TO BE CHANGED INTO RANDOM
  
    let act_key = name.replace(" ", "") + "id";
    console.log(name)

    if(name !== "" && subs_list.length > 0){
        // alert(JSON.stringify(subs_list).toString())
        if(gtype == "quiz"){
            alert("quiz")
            quiz_ref.child(guild_key).child(act_key).set({
                date: date,
                name: name
            });
            for(let i = 0; i < subs_list.length;i++){
                quiz_ref.child(guild_key).child(act_key).child("SubTopics").child(subs_list[i].topic).update({
                    xp:subs_list[i].xp
                });
            }
        } else if(gtype == "lab-activity"){
            lab_ref.child(guild_key).child(act_key).set({
                date: date,
                name: name
            })
            for(let i = 0; i < subs_list.length;i++){
                lab_ref.child(guild_key).child(act_key).child("SubTopics").child(subs_list[i].topic).update({
                    xp:subs_list[i].xp
                });
            }
        } else{
            exam_ref.child(guild_key).child(act_key).set({
                date: date,
                name: name
            })
            for(let i = 0; i < subs_list.length;i++){
                exam_ref.child(guild_key).child(act_key).child("SubTopics").child(subs_list[i].topic).update({
                    xp:subs_list[i].xp
                });
            }
        }
        
        alert("Succesfully Added")
        location.reload();
    } else {
        alert("add subtopics first")
    }
    
    
    
}

let subs_list = new Array();
function addSubs(){
    
    let subname = document.getElementById("subtopic").value;
    let total = document.getElementById("total_num").value;
  
    
    subs_list.push({topic:subname, xp:total});
    let subs = document.getElementById("subs_container");
    if(subs_list.length > 0){
        subs.innerHTML = "";
        for(let i = 0; i < subs_list.length;i++){
            let p = document.createElement("p");
            p.innerHTML = "<br>Topic: " + subs_list[i].topic + "<br>XP: " + subs_list[i].xp;
            subs.appendChild(p)
        }
    }
    document.getElementById("subtopic").value = "";
    document.getElementById("total_num").value = 0;
    return;
    

}

function view_participants(){
    location.href = "participants.html" + "?/" + guild_key;
}