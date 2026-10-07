function login() {
    var name = document.getElementById("name").value;
    var roll = document.getElementById("roll").value;
    if (name == "" || roll == "") {
        alert("Please enter all details");
    }
    else {
        document.getElementById("student").innerHTML = name;
        document.getElementById("studentRoll").innerHTML = roll;
        document.getElementById("login").style.display = "none";
        document.getElementById("instructions").style.display = "block";
    }
}
function startExam() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("exam").style.display = "block";
    startTimer();
}
var time = 300;
function startTimer() {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    document.getElementById("time").innerHTML =
        minutes + ":" + seconds;
    time--;
    if (time >= 0) {
        setTimeout(startTimer, 1000);
    }
    else {
        alert("Time is over");
        submitExam();
    }
}
function question(number) {
    alert("Question " + number + " selected");
}
function submitExam() {
    var score = 0;
    if (document.querySelector('input[name="q1"]:checked')?.value == "1") {
        score++;
    }
    if (document.querySelector('input[name="q2"]:checked')?.value == "1") {
        score++;
    }
    if (document.querySelector('input[name="q3"]:checked')?.value == "1") {
        score++;
    }
    document.getElementById("exam").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("resultName").innerHTML =
        document.getElementById("name").value;
    document.getElementById("resultRoll").innerHTML =
        document.getElementById("roll").value;
    document.getElementById("score").innerHTML =
        score + " / 3";
}