const mongoose= require('mongoose');
const bcrypt=require('bcryptjs');
const user=require('../routes/users');
const unIqueValidator=require('mongoose-unique-validator');
// User  Schema
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true
    },
    email:{
        type:String,
        unique: true,
        required:true
    },
    username:{
        type:String,
        unique: true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    }
},{
    timestamps: true
});

UserSchema.plugin(unIqueValidator);

const User=module.exports=mongoose.model('User',UserSchema);

//Find the user by Id
module.exports.getUserByID =function(id, callback){
    User.findById(id, callback);
}

//Find the user by it's username
module.exports.getUserByUsername= function(username ,callback){
    const query={
        username:username
    }
    User.findOne(query, callback);
}

//To Register the user
module.exports.addUser=function(newUser ,callback){
    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err)throw err;
            newUser.password=hash;
            newUser.save(callback);
        })
    })
}

//Compare Password
module.exports.comparePassword=function(password, hash, callback){
    bcrypt.compare(password, hash, (err ,isMatch)=> {
        if(err) throw err;
        callback(null, isMatch);
    });
}

