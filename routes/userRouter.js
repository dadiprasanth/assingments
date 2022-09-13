const express=require("express")
const user=require("../collections/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{body,validationResult}=require("express-validator")
const route=express.Router();
const secret="secret"

route.post("/register",body("email").isEmail(),body("name").isAlpha(),body("password").isString(),async(req,res)=>{
    try{
        
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }
        const{name,email,password}=req.body;
        bcrypt.hash(password, 10, async function(err, hash) {
            // Store hash in your password DB.
            if(err){
                return res.status(404).json({
                    error:err.message
                })
            }
            await user.create({
                name,
                email,
                password:hash

            })
        const data=await user.findOne({email})
        return res.status(200).json({
            message:"Success",
            data  
        })
  
        });
        
    }catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })
    }
})
route.post("/login",body("email").isEmail(),body("password").isString(),async(req,res)=>{
    try{
        console.log("in try block")
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({
                error:error.array()
            })
        }
        const {email,password}=req.body;
        const data= await user.findOne({email})
        if(data==null){
            return res.status(404).json({
                status:"error",
                message:"invalid user name"
            })
        }
        bcrypt.compare(password, data.password, function(err, result) {
            // result == true
            
            if(err){
                console.log("in bcrypt err")
                return res.status(400).json({
                    error:err.message
                })
            }
            
            if(result){
                const token=jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data._id
                  }, secret);
                return res.status(200).json({
                    status:"success",
                    token
                })

            }else{
                return res.status(404).json({
                    status:"error",
                    message:"Invalid password"
                })
            }
        });
       

    }catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })
    }



})





module.exports=route;