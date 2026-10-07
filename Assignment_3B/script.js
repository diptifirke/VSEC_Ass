let rain = document.getElementById("rain");

let snow = document.getElementById("snow");

let sun = document.getElementById("sun");

function clearWeather(){

    rain.style.display = "none";

    snow.style.display = "none";

    sun.classList.remove("glow");

}

function sunny(){

    clearWeather();

    document.body.style.background = "skyblue";

    sun.innerHTML = "☀️";

    sun.classList.add("glow");

}


function rainy(){

    clearWeather();

    document.body.style.background = "gray";

    sun.innerHTML = "☁️";

    rain.style.display = "block";

}

function snowy(){

    clearWeather();

    document.body.style.background = "lightgray";

    sun.innerHTML = "☁️";

    snow.style.display = "block";

}

sunny();