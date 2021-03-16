const mongoose = require('mongoose');

const {Schema} = mongoose;

const userschema = new Schema({
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    email:String,
    age:Number,
    balance:Number,
    gender:String
})


module.exports = mongoose.model("User", userschema)