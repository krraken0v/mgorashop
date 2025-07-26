const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../middlewares/Auth');
router.get('/:productId',async(req,res)=>{
    const prisma = req.app.get('prisma');
    const {productId} = req.params;
    try{
        const allComms = await prisma.comment.findMany({where:{
            productId
        },
        orderBy:{
                createdAt:'desc'
            },
        include:{
            user:{
                select:{
                    username:true
                }
            }
        },
    });
        res.status(200).json(allComms);
    } catch(error){
        res.status(500).json({message:"Ошибка сервера"});
    }
})
router.post('/:productId',AuthMiddleWare,async(req,res)=>{
    const {productId} = req.params;
    const {content} = req.body;
    const userId = req.user.id;
    const prisma = req.app.get('prisma');
    if(!content||!content.trim()){
        res.status(400).json({message:"Комментарий должен быть заполнен"});
    }
    if(!userId){
        res.status(400).json({message:"Нужно зарегестрироваться или войти чтобы писать комментарии"})

    }
    try{
        const createComment = await prisma.comment.create({
            data:{
                productId,
                userId,
                content
            },
            include:{
                user:{
                    select:{
                        username:true
                    }
                }
            }
        })
        res.status(200).json({message:"Комметарий успешно создан",comment:createComment});
    } catch(error){
        res.status(500).json({message:'Произошла ошибка сервера'});
    }
})
module.exports = router;