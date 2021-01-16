// External Packages
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema=mongoose.Schema;

const userSchema=Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        index: { unique: true },
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter Valid Email');
            }   
        }

    },
    password:{
        type:String,
        required:true,
        minlength: 7,
        trim:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],

},{
    timestamps: { createdAt: true, updatedAt: false }
  });



userSchema.methods.toJSON=function(){
    const user=this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}


userSchema.methods.generateAuthenticationtoken=async function(){
    const user=this;
    const token = jwt.sign({_id:user._id.toString()},'transactiondashboard',{expiresIn:'1 day'});
    user.tokens=user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.pre('save',async function(next){
    const user=this;
    if(this.isModified('password'))
        user.password=await bcrypt.hash(user.password,8);

    next();
});


module.exports = mongoose.model('User',userSchema);