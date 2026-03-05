const mongoose =require("mongoose");
const { type } = require("os");
const Schema =mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");
//username and the password will automatically defined by passportLocalMongoose

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    
});
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('User',userSchema);