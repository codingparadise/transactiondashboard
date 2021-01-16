// External Packages
const mongoose = require('mongoose');

const Schema=mongoose.Schema;
const transactionSchema=Schema({
        amount:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            trim:true,
            required:true

        },
        type:{
            type:String,
            trim:true,
            required:true
        },
        holder:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
},{
    timestamps: { createdAt: true, updatedAt: true }
  });

module.exports = mongoose.model('Transaction',transactionSchema);



