const express = require("express");
const router = express.Router({mergeParams:true});
const cookieParser=require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies",(req,res)=>{
    console.dir(req.cookies);
    res.cookie("greet","hello");
    res.send("sent you some cookies");
});
