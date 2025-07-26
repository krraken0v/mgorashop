const jwt = require("jsonwebtoken");
const Auth = async (req,res,next)=>{
    
    try{
        const token = req.cookies.token;
    if(!token){
        res.status(401).json({message:"Пользователь не зарегестрирован"});
    }
    const decoded = jwt.verify(token,process.env.SECRET_JWT);
    req.user = {id:decoded.id};
    next();
} catch(error){
    res.status(401).json({message:"Произошла ошибка при авторизации пользователя"});
}

}
module.exports = Auth;