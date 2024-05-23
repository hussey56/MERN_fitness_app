const express = require('express');
const Router = express.Router();
const UserController = require('../controller/User')
const auth = require('../middleware/auth')
//testing
Router.get('/test',(req,res)=>res.json({msg:"Working Backend!"}));

// register user
 Router.post('/reguser',UserController.signup);

 //login
Router.post('/login',UserController.login);

//logout
Router.post('/logout',auth,UserController.logout);

//refresh
Router.get('/refresh',UserController.refresh);
module.exports = Router 