const express=require('express')
const app=express();

const connectDatabase=require("./config/databaseConfig.js");

connectDatabase();
app.use('/',(req,res)=>{
    res.status(200).json({
        data:"JWTAuth server"
    });
})

module.exports=app;