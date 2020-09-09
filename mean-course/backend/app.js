 const express = require('express');
 const bodyParser=require('body-parser');
 const mongoose=require('mongoose');

 const postsRoutes=require("./routes/posts");
 const userRoutes=require("./routes/user");


 // ./mongo "mongodb+srv://cluster0.fgpom.mongodb.net/<mean-course-db>" --username shehroz
 //oCqM0tUkCqhmnONz

const Post= require('./models/post');

const app=express();


mongoose.connect("mongodb+srv://shehroz:oCqM0tUkCqhmnONz@cluster0.fgpom.mongodb.net/mean-course-db?retryWrites=true&w=majority")
.then(()=>{
  console.log("Connected to database...");
})
.catch((err)=>{
  console.log("connnecttion failed..")+err;
});

app.use(bodyParser.json())

app.use((req,res,next)=>{

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With,Content-Type,Accept,Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
  next();


});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);




 module.exports=app;


