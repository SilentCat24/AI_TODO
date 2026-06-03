const mongoose=require('mongoose')
const express =require('express')
const cors=require('cors')
require("dotenv").config();
const taskRoutes=require('./Controllers/Tasks');
const connectDb=require('./db')


const app=express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;
connectDb();

app.use('/auth/',taskRoutes)

app.get('/',(req,res)=>{
    res.send("Api is running.....")
})

app.listen(PORT,()=>{
    console.log(`server has started 8000`);
})