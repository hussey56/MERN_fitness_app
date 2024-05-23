const express = require('express');
const Router = express.Router();

//testing
Router.get('/test',(req,res)=>res.json({msg:"Working Backend!"}));



module.exports = Router