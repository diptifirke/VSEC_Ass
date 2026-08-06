function calculate() {

    let name = document.getElementById("name").value;

    let physics = Number(document.getElementById("physics").value);

    let chemistry = Number(document.getElementById("chemistry").value);

    let maths = Number(document.getElementById("maths").value);

    let total = physics + chemistry + maths;

    let percentage = (total / 300) * 100;

    document.getElementById("result").innerHTML =
    "Student Name: " + name +
    "<br>Total Marks: " + total +
    "<br>Percentage: " + percentage.toFixed(2) + "%";

}7