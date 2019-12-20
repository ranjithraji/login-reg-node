const express =require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const passport=require('passport');
const path=require('path');

// //Bring in th database object\
// const config=require('./config/database');
//mongoDb config
mongoose.set('useCreateIndex', true);

//Connect with the database
mongoose.connect( 'mongodb://localhost:27017/myapp', { useNewUrlParser: true})
.then(() => {
   console.log('Database connected successfully');
}).catch(err =>{
   console.log(err);
})

//Initailalize the app
const app=express();

//Define line port
 const PORT=process.env.PORT || 1000;

 //Define Line Middleares
app.use(cors());

//set the static 
app.use(express.static(path.join(__dirname,'public')));

//Bodyparser Middleare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//passport Middlearse 
app.use(passport.initialize());
app.use(passport.session());

 app.post('/',(request, response)=>{
    return response.json({
        message: "This is node.js role of authentication system"
    });
 });

//String  in the user router
const users=require('./routes/users');
 app.use('/api/users',users);
app.listen(PORT,()=>{
    console.log('server was running an Port',PORT);
 });

