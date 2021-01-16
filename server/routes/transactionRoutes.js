// External Packages
const express=require('express');

// Middleware
const auth = require('../middleware/auth');

// Initialize Router
const router=express.Router();

// Initialize Controller
const transactionController=require('../controllers/transactionController');

// Route to Add Transaction
router.post('/add',auth,transactionController.addTransaction);

// Route to Fetch Transaction
router.get('/transactions',auth,transactionController.fetchTransactions);

// Route to Fetch Single Transaction
router.get('/transaction/:id',auth,transactionController.getTransaction);

// Route to Update Single Transaction
router.patch('/transaction/:id',auth,transactionController.updateTransaction);

// Route to Delete Single Transaction
router.delete('/transaction/:id',auth,transactionController.deleteTransaction);

// Export Router
module.exports=router;
