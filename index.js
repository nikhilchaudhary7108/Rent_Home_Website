if(process.env.NODE_ENV !="production"){
  require("dotenv").config();
}

console.log(process.env);


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path =require("path");
const mongo_url = "mongodb://127.0.0.1:27017/test";
const methodoverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError =require("./utils/ExpressError.js");
const router=require("./routes/listing.js");
const reviewsrouter=require("./routes/review.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport =require("passport");
const LocalStrategy =require("passport-local");
const User=require("./models/user");
const userRouter=require("./routes/user.js");



app.use(methodoverride("_method"));
app.set("view engine","ejs");
app.engine('ejs',ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}

app.get("/", (req, res) => {
  res.send("Hey, hello! You are there.");
});



const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};
const sessionOptions={
  secret:"mysecret",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());






app.use((req,res,next)=>{
  res.locals.sucess=req.flash("success");
  res.locals.error=req.flash("error");
  // console.log(res.locals.success);
  res.locals.currentuser=req.user;
  next();
});


app.use("/listings",router);
app.use("/listings/:id/reviews",reviewsrouter);
app.use("/",userRouter);
//for all routes other than defined
app.all("*",(req,res,next)=>{
  next(new ExpressError(404 ,"page not found"));
});

app.use((err,req,res,next)=>{
  let {statuscode=500,message="something went wrong"}=err;
  res.status(statuscode).render("error.ejs",{message});
  //res.status(statuscode).send(message);
});


app.listen(8080, () => {
  console.log("Server is running on port 3000");
});

// app.get("/demouser",async(req,res)=>{
//   let fakeuser=new User({
//     email:"hanumanth@gmail.com",
//     username:"hanumanth",
//   });
//  let registerUser= await User.register(fakeuser,"noneedthisfellow");
//  res.send(registerUser);
// });

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "MY new villa",
//     description: "By the beach",
//     price: 12000,
//     location: "Vishakapatnam",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample listing was saved");
//   res.send("Successful creation");
// });

// const validateListing =(req,res,next)=>{
//   let error =listingSchema.validate(req.body);
//   if(error){
//     let errmsg=error.details.map((el)=>el.message).join(",");
//     throw new ExpressError(400,error);
//   }else{
//     next();
//   }
// }