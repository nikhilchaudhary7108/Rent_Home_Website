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
    email:String,
});

const postSchema =new Schema({
    content:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
});


const user=mongoose.model("user",userSchema);
const post=mongoose.model("post",postSchema);


const adddata =async()=>{
    let user1=new user({
        username:"hanumanth",
        email:"sapavathhanumanth@gmail.com"
    });
    let post1=new post({
        content:"hello hanumanth",
        likes:12334,
    });
    post1.user=user1;
    await user1.save();
    await post1.save();
};

adddata();