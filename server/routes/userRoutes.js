
// External Packages
const express=require('express');

// Middleware
const auth = require('../middleware/auth');

// Initialize Router
const router=express.Router();

// Initialize Controller
const userController=require('../controllers/userController');

// Route to createAccount
router.post('/create',userController.createAccount);

// Route to login
router.post('/login',userController.login);

// Route to logout
router.post('/logout', auth , userController.logout);


// Export Router
module.exports=router;
