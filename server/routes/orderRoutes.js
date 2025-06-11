const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
router.post('/', async (req,res)=>{
    try{
        const {name,email,phone,adress,items} = req.body;
        const newOrder = new Order({
            name,
            email,
            phone,
            adress,
            items,
        });
        const savedOrder =  await newOrder.save();
        res.status(201).json(savedOrder);
    } catch(err){
        res.status(500).json({message:err});
    }
})
module.exports = router;