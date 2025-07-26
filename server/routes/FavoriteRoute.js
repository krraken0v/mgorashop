const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../middlewares/Auth');
router('/:productId',AuthMiddleWare,async(req,res)=>{
    const {productId} = req.params;
    const prisma = req.app.get('prisma');
    const userId = req.user.id;
    if(!userId){
        res.status(400).json({message:"нужно войти или зарегестрироваться для добавления товара"});
    }
    try{
        const findUnique =  await prisma.favorite.findUnique({where:{
            userId_productId:{
                userId,videoId
            }
        }
    })
    if(!findUnique){
        const createFavorite = await prisma.favorite.create({
            data:{
                userId,
                productId
            }
        })
        res.status(200).json({message:"Успешно добавлено в избранное",content:createFavorite});
    } else{
        res.status(400).json({message:"Вы уже добавили этот продукт в избранное"});
    }
    } catch(err){
        res.status(500).json({message:"ошибка сервера при добавлении в избранное"});
    }
})
module.exports = router;