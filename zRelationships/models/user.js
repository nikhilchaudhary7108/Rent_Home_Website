const mongoose =require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/relationdemo";
const {Schema}=mongoose;



main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongo_url);
}


const userSchema=new Schema({
    username:String,
    addresses:[
        {
            _id:false,
            location:String,
            city:String,
        },
    ],
});
const User =mongoose.model("User",userSchema);
const adduser =async()=>{
    let user1=new User({
        username:"hanumanth",
        addresses:[{
            location:"nalgonda",
            city:"telangana"
        }],
    });
    user1.addresses.push({location:"mgt",city:"miryalaguda"});
    let result =await user1.save();
    console.log(result);
}
adduser();