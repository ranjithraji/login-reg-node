const express = require('express');
const router=express.Router();
const passport=require('passport');
const jwt=require('jsonwebtoken');
const User = require('../models/User');
const mongoose=require('mongoose');
const config=require('../models/config');
const middleware = require('../models/middleware');

router.post('/register', (req, res)=> {
    let newUser= new User({
        name: req.body.name,
        username: req.body.username,
        email:req.body.email,
        contact:req.body.contact,
        password:req.body.password
    });
    User.addUser(newUser, (err, user)=>{
        if(err){
            let message="";
            if(err.errors.username) message="username is already taken";
            if(err.errors.email) message="email already taken";
            return res.json({
                success:false,
                message:"sorry"
            });
        }
        else{
            return res.json({
                success:true,
                message:"user registration is successfull"
            });
        }
    })
});

router.post('/login',(req, res)=>{
    const username =req.body.username;
    const password =req.body.password;
    User.getUserByUsername(username, (err, user)=> {
        if(err) throw err;
        if(!user){
            return res.json({
                success:true,
                message:"User not found"
            });
            // res.status(404).json({ errors });
        }
        
        User.comparePassword(password, user.password, (err, isMatch)=> {
            if(err)throw err;
            console.log(password);
            console.log(user.password);
            if(isMatch){
                let token = jwt.sign({username: user.username},config.secret,{ expiresIn: '24h'});
                  // return the JWT token for the future API calls
                  res.json({
                    success: true,
                    message: 'Authentication successful!'+username,
                    token: token
                  });
            }
            else{
                return res.json({
                    success:true,
                    message:"wrong password."
                });
            }

        });
    })
})
module.exports=router;
