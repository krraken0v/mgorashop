const express = require('express');
const Admin = require('../models/Admin');
const router = express.Router();
router.get('/',async (req,res) =>{
    try{
        const orders = await Admin.find();
        res.json(orders);
    } catch(err){
        res.status(500).json({message:err});
    }
    
})
module.exports = router;