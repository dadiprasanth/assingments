const mongoose=require("mongoose")
const schema=mongoose.Schema;
const postSchema=new schema({
    title:{type:String,require:true},
    body:{type:String,require:true,unique:true},
    image:{type:String,require:true},
    user:{type:schema.Types.ObjectId,ref:"user"}
    //user:{type:Schema.Types.ObjectId,ref:"user"}
   // {type:Schema.Types.ObjectId,ref:"blogs"}
})

module.exports=mongoose.model("post",postSchema)