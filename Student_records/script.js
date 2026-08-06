function calculate(){

    let name = document.getElementById("name").value;

    let phy = Number(document.getElementById("phy").value);

    let chem = Number(document.getElementById("chem").value);

    let math = Number(document.getElementById("math").value);

    let total = phy + chem + math;

    let percentage = total / 3;

    let table = document.getElementById("table");

    let row = table.insertRow();

    row.insertCell(0).innerHTML = name;
    row.insertCell(1).innerHTML = phy;
    row.insertCell(2).innerHTML = chem;
    row.insertCell(3).innerHTML = math;
    row.insertCell(4).innerHTML = total;
    row.insertCell(5).innerHTML = percentage.toFixed(2) + "%";

    document.getElementById("name").value = "";
    document.getElementById("phy").value = "";
    document.getElementById("chem").value = "";
    document.getElementById("math").value = "";

}