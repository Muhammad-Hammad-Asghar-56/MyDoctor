const express = require('express')
const app = express()
const Route=require("./Routes/index")
var cookieParser = require('cookie-parser')
const NurseDBHandler=require("./Database/nurse.js");

app.use(express.json())
app.use(cookieParser())
const port=3000;

app.use(Route)

app.listen(3000,(req,res)=> {
    console.log('listening on port on http://localhost:'+port+'/');
})