const express= require('express');
const router = express.Router();
const Product = require('../models/Product');
router.get('/',async(req,res)=>{
    const searchedItem = req.query.query;
    try{
        if(!searchedItem.trim()||!searchedItem){
            res.status(400).json({message:'Вам нужно ввести что-то для поиска'});
        }
        const products = await Product.find({title:{$regex:searchedItem,$options:'i'}});
        res.status(200).json(products);

    } catch(error){
        res.status(500).json({message:"Произошла ошибка при получении товаров поиска"});
    }
});
module.exports = router;