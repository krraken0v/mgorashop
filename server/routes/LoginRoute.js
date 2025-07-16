const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/',async(req,res)=>{
    try {
        const prisma = req.app.get('prisma');
    const {email,password} = req.body;
    const uniqueUser = await prisma.user.findUnique({where:{email},select:{id:true,password:true}});
    const passwordUser = uniqueUser.password;
    
    if(!uniqueUser){
      return   res.status(404).json({message:"Такого пользователя не зарегестрировано"});
    }
    const isMatch = await bcrypt.compare(password,passwordUser);
    if(!isMatch){
        return res.status(401).json({message:"Неправильный пароль"});
    }
    const token = jwt.sign({id:uniqueUser.id,email:uniqueUser.email},process.env.SECRET_JWT,{expiresIn:'1d'});
    res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'Lax',
        maxAge:7 * 24 * 60 * 60 * 1000,
    }).status(200).json({message:"Успешный вход"});
} catch (error) {
        res.status(500).json({message:"Произошла ишибка при входе"});
    }
})
module.exports = router;