function calculate() {

    let name = document.getElementById("name").value;
    let Phy = Number(document.getElementById("Phy").value);
    let Chem = Number(document.getElementById("Chem").value);
    let Math = Number(document.getElementById("Math").value);

    let total = Phy + Chem + Math;
    let percentage = (total / 300) * 100;

    document.getElementById("result").innerHTML =
        "Name: " + name +
        "<br>Total: " + total +
        "<br>Percentage: " + percentage.toFixed(2) + "%";
}