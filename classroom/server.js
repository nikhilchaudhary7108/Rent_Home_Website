const express = require("express");
const app = express();
const users =require("./user.js");
const posts=require("./routes/user.js");
const posts=require("/routes/posts.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");



app.use(cookieParser("secretcode"));
app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","india",{signed:true});
    res.send("signed cookie sent");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
});

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namaste");
});

app.listen(3000,()=>{
    console.log("server is listening to 3000");
});
