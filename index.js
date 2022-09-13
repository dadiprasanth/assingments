const express=require("express")
const mongoose=require("mongoose")
const userRouter=require("./routes/userRouter")
const bodyparser=require("body-parser")
const postRouter=require("./routes/postRouter")
const jwt = require('jsonwebtoken');
const app=express()
const secret="secret";
const port=3000
app.use(bodyparser.json())
mongoose.connect("mongodb://localhost/assingment",(err)=>{
    if(err){
        console.log("connection failed")
    }else{
        console.log("connected")
    }
})
app.use("/posts",(req,res,next)=>{
    //validation of token
    try{
        //console.log(req.headers.authorization)
        const token=req.headers.authorization;
        jwt.verify(token,secret, function(err, decoded) {
            if(err){
                return res.status(400).json({
                    error:"error",
                    message:err.message
                })
            }
            req.user=decoded.data;
            console.log(req.user)
            next()
          })

    }catch(e){
       return res.status(404).json({
        staus:"error at token verification",
        message:e.message
       }) 
    }
})
app.use("/posts",postRouter)
app.use("/",userRouter)








  





app.listen(port,()=>console.log(`app is loading at ${port}`))