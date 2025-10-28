const router=require("express").Router();
const User=require("../models/user");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();

router.post("/sign-in", async (req,res)=>{
    try {
        const { username,email,password }=req.body;
        const existingUser=await User.findOne({username:username});
        const existingEmail=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"Username already exists"});
        }else if(username.length<4){
            return res.status(400).json({message:"Username should have atleast 4 characters"});
        }
        if(existingEmail){
            return res.status(400).json({message:"Email already exists"});
        }
        
        const hashpass=await bcrypt.hash(req.body.password,10);

        const newUser=new User({
            username:req.body.username,
            email:req.body.email,
            password:hashpass,
        });
        await newUser.save();
        return res.status(201).json({message:"sign up successfully"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }

});

router.post("/log-in",async (req,res)=>{
    try {
        const {username,password}=req.body;
        const existingUser=await User.findOne({username:username});
        if(!existingUser){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                const authClaims=[{name:username},{jti:jwt.sign({},process.env.JWT_SECRET)}]
                const token=jwt.sign({authClaims},process.env.JWT_SECRET,{expiresIn:"2d"});
                res.status(200).json({id:existingUser._id,token:token});
            }else{
                return res.status(400).json({message:"Inavlid Credentials"})
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});
    }
})
module.exports=router;