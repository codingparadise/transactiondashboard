
// External Packages
const express =require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')

// Internal Packages
const path =require('path');

// App Initialization
const app =express();
const port= process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(cors());


// Routes
const userRoutes=require('./routes/userRoutes');
const transactionRoutes=require('./routes/transactionRoutes');

// Redirect Routes
app.use(userRoutes);
app.use(transactionRoutes);

// Database Connection
mongoose.connect('mongodb+srv://admin:8rFuGX6BvP3fRffV@projectcluster.1weda.mongodb.net/transactions?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex:true, 
    useUnifiedTopology: true,
    useFindAndModify:false
})
.then((response)=>{
    app.listen(port,()=>{
        console.log(`Server is Running on port ${port}`);      
    });
})
.catch((error)=>{
    console.log(error);    
});





