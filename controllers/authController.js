const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//Generate Token
const generateToken = (user) => {
    return jwt.sign(
        {id:user._id,username:user.username,email:user.email,role:user.role},
        process.env.JWT_SECRET_KEY,
        {expiresIn:process.env.JWT_EXPIRES_IN}
    )
}

//register User
exports.registerUser = async(req,res) =>{
    try{
        let {username,email,password,role} = req.body;
        // / Normalize email
    email = email.toLowerCase();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User is already registered with us"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            username,password:hashedPassword,email,role
        });
        res.status(201).json({
            message:"Registered Successfully",
            newUser:{
                _id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            },
            token:generateToken(user)
        })
    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }
}
//login User
exports.loginUser = async(req,res) => {
      try{
        let {username,email,password,role} = req.body;
        // / Normalize email
    email = email.toLowerCase();
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json({message:"User is not registered with us"})
        }
        const isMatchPassword = await bcrypt.compare(password,existingUser.password);
        
        if(existingUser && isMatchPassword){
        return res.status(200).json({
            message:"Logged Successfully",
            user:{
                _id:existingUser._id,
                username:existingUser.username,
                email:existingUser.email,
                role:existingUser.role
            },
            token:generateToken(existingUser)
        })
    }
    else{
        return res.status(400).json({message:"Invalid Credientials"});
    }
    }
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }

}
exports.getAllUserList = async(req,res) => {
    try{
        const user = await User.find();
        res.status(200).json({
            message:"user list",
            userList:user
        })

    }
    
    catch(err){
        res.status(500).json({message:`Internal Server Error ${err.message}`})
    }
}
