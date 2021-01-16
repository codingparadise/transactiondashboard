const Transaction = require('../models/transaction');


// Add Transaction
exports.addTransaction=(req,res,next)=>{

    const transaction = new Transaction({
        ...req.body,
        holder:req.user._id
    });


    transaction.save()
    .then((response)=>res.status(201).send(response))
    .catch((error)=>res.status(400).send(error));

}


// Fetch Transactions
exports.fetchTransactions=(req,res,next)=>{

    const holder = req.user._id;
    Transaction.find({holder})
    .then((response)=>res.status(200).send(response))
    .catch((error)=>res.status(500).send(error));

}


// Get Single Transaction
exports.getTransaction=(req,res,next)=>{
    const _id =req.params.id;

    Transaction.findById(_id)
    .then((response)=>{
        if(!response)
            return res.status(404).send();    
        return res.status(201).send(response);
    })
    .catch((error)=>res.status(500).send(error));

}


// Update Transaction
exports.updateTransaction=(req,res,next)=>{

    Transaction.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators:true})
    .then((response)=>{
        if(!response)
            return res.status(404).send();    
        return res.status(201).send(response);
    })
    .catch((error)=>res.status(400).send(error));

}

// Delete Transaction
exports.deleteTransaction=(req,res,next)=>{

    Transaction.findByIdAndDelete(req.params.id)
    .then((response)=>{
        if(!response)
            return res.status(404).send();  
        return res.status(200).send(response);
    })
    .catch((error)=>res.status(400).send(error));

}


