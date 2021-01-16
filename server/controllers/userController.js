// External Packages
const bcrypt = require('bcryptjs');

const User = require('../models/user');

// Create User
exports.createAccount=async (req,res,next)=>{
    
    try{

        const user = new User(req.body); 
        await user.save();
        const token =await user.generateAuthenticationtoken();
        return res.status(201).send({user,token});

    }catch(error){
        res.status(500).send(error);
    }


}

// Login User
exports.login=async (req,res,next)=>{

    try{
        const email=req.body.email;
        const user = await User.findOne({ email });

        if(!user)
            return res.status(404).send();  

        const isMatch=await bcrypt.compare(req.body.password,user.password);

        if(!isMatch)
            return res.status(400).send(); 

        const token =await user.generateAuthenticationtoken();

        return res.status(200).send({user,token});


    }catch(error){
        res.status(500).send(error);
    }

}


// Logout User
exports.logout=async (req,res,next)=>{
    
    try{

        req.user.tokens =[];
        await req.user.save();
        res.status(200).send();

    }catch(error){
        res.status(500).send(error);
    }


}