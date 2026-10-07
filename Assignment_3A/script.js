let students = [];

function addStudent()
{
    let name = document.getElementById("name").value;

    let physics = Number(document.getElementById("physics").value);

    let chemistry = Number(document.getElementById("chemistry").value);

    let maths = Number(document.getElementById("maths").value);

    let total = physics + chemistry + maths;

    let percentage = total / 3;

    let student = {

        name : name,

        physics : physics,

        chemistry : chemistry,

        maths : maths,

        total : total,

        percentage : percentage

    };

    students.push(student);

    displayStudents();

}

function displayStudents()
{

    let table = "";

    let highest = 0;

    let topper = "";

    for(let i=0; i<students.length; i++)
    {

        table = table +

        "<tr>" +

        "<td>" + students[i].name + "</td>" +

        "<td>" + students[i].physics + "</td>" +

        "<td>" + students[i].chemistry + "</td>" +

        "<td>" + students[i].maths + "</td>" +

        "<td>" + students[i].total + "</td>" +

        "<td>" + students[i].percentage.toFixed(2) + "%" + "</td>" +

        "</tr>";


        if(students[i].percentage > highest)
        {

            highest = students[i].percentage;

            topper = students[i].name;

        }

    }

    document.getElementById("tableBody").innerHTML = table;

    document.getElementById("topper").innerHTML =
    "Topper : " + topper +
    " (" + highest.toFixed(2) + "% )";

    document.getElementById("name").value="";

    document.getElementById("physics").value="";

    document.getElementById("chemistry").value="";

    document.getElementById("maths").value="";

}