const express= require("express");
const post=require("../collections/post");
const user = require("../collections/user");
const route=express.Router();


route.get("/",async(req,res)=>{
    try{
        
        const data=await post.find({user:req.user})
        const name=await user.findOne({_id:req.user})
        return res.status(200).json({
            status:`fetching all the post of ${name.name}`,
            data

        })
    }
    catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })

    }
})
route.post("/",async(req,res)=>{

    try{
        const{title,body,image}=req.body;
        await post.create({
            title,
            body,
            image,
            user:req.user

        })
        const data=await post.findOne({image})
        return res.status(200).json({
            status:"post created",
            data

        })
    }
    catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })

    }
})

route.put("/:id",async(req,res)=>{
    try{
        
        await post.updateOne({_id:req.params.id},req.body)
        
        return res.status(200).json({
            status:"sucessfully updated",
            

        })
    }
    catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })

    }
})
route.delete("/:id",async(req,res)=>{
    try{
        
        await post.deleteOne({_id:req.params.id},req.body)
        
        return res.status(200).json({
            status:"sucessfully Deleted",
            

        })
    }
    catch(e){
        return res.status(404).json({
            status:"error",
            message:e.message
        })

    }
})




module.exports=route;