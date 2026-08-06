const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"firke",
    database:"login_db"
});

db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});

app.post("/login",(req,res)=>{

    const {username,password}=req.body;

    const sql="SELECT * FROM users WHERE username=? AND password=?";

    db.query(sql,[username,password],(err,result)=>{

        if(err){
            res.send(err);
        }
        else{

            if(result.length>0){

                res.json({
                    success:true,
                    message:"Login Successful"
                });

            }

            else{

                res.json({
                    success:false,
                    message:"Invalid Username or Password"
                });

            }

        }

    });

});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});