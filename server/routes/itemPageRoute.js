const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/:id',async(req,res)=>{
    try{
       const productId = req.params.id;
       const product = await Product.findById(productId);
       if(!product){
           res.status(404).json({message:"товар не найден"})
       };
       res.status(200).json(product);
    } catch(err){
        res.status(500).json({message:'Ошибка сервера'});
    }
    

})
module.exports = router;