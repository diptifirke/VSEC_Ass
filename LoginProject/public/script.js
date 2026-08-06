function login(){

const username=document.getElementById("username").value;

const password=document.getElementById("password").value;

fetch("/login",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

username,

password

})

})

.then(res=>res.json())

.then(data=>{

document.getElementById("result").innerHTML=data.message;

});

}