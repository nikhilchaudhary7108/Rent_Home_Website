const express=require("express");
const app =express();

app.use("/api",(req,res,next)=>{ 
    let {token}=req.query;
    if(token==="giveaccess"){
        console.log("give access");
        next();
    }
        res.send("ACCESS DENIED");});

app.use("/api",(req,res,next)=>{ 
    res.send("hello iam middle ware");
});   

app.use("/api/api",(req,res,next)=>{ 
    res.send("iam api/api");
});  
// app.use((req,res,next)=>{ console.log("hello iam middle ware");
//     next();});
// app.use((req,res,next)=>{ console.log("hello iam 222 middle ware");
//         next();});

// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//    console.log(req.method,req.hostname,req.time);
//    console.log(req.path);
//    next(); 
// })
app.get("/",(req,res)=>{
    res.send("hello hanumanth");
});

app.get("/random",(req,res)=>{console.log("you are at the random");
    res.send("hello random user");});
app.listen(8080,()=>{console.log("server on 8080");});
//utility middleware //logger to log information


//error handling middleware 

app.get("/err",(err,res)=>{
    abcd=abdc;
});
app.use((err,req,res,next)=>{
    console.timeLog(err);
    next();
})
