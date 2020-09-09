const express=require('express');
const app=express();
const pool=require("./db");
app.use(express.json()) // => req.body

// ROUTES 


// get "All todo's"

// get a todo

// create a todo

app.post("/todos",async(req,res)=>{
    try {
        //await

        const {description}=req.body;
        const newTodo=await pool.query("INSERT INTO todo(description) VALUES ($1) RETURNING *",[description]);
        res.json(newTodo);
       console.log(newTodo);
    } catch (error) {
        console.log('The error=>>>'+error.message);        
    }
});

// update a todo

// delete a todo

app.listen(3000,()=>{
    console.log('This Server is listening on the port 3000');
});