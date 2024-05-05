const express = require('express')
const app = express()
const Route=require("./Routes/index")
var cookieParser = require('cookie-parser')
const NurseDBHandler=require("./Database/nurse.js");
const pool=require("./Database/index.js")
const cors =  require('cors')
const dotenv = require("dotenv").config()
app.use(express.json())
app.use(cookieParser())
app.use(cors());
const port=3005;

app.use(Route)

app.listen(3005,(req,res)=> {
    pool.query("Select * from nurse",()=>{
        console.log("Connection has been created Successfuly");
    });
    console.log('listening on port on http://localhost:'+port+'/');
})