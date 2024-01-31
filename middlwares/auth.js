import jwt from "jsonwebtoken"
export const auth=(req,res,next)=>{
    let token=req.headers["x-access-token"];
    if(!token)
     return res.status(401).json({type:"not authorized",message:"missing token"})
    try{
        let user=jwt.verify(token,process.env.SECRET_JWT);
        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({type:"not authorized",message:"invalid token/token expired"})
    }
}
export const authAdmin=(req,res,next)=>{
    let token=req.headers["x-access-token"];
    if(!token)
     return res.status(401).json({type:"not authorized",message:"missing token"})
    try{
        let user=jwt.verify(token,process.env.SECRET_JWT);
        console.log(user)
        console.log(user.role)
        if(user._id.role!="ADMIN"){
            return res.status(403).json({type:"not allowed",message:"this operation only manager"})
        }

        req.user=user;
        next();
    }
    catch(err){
        return res.status(401).json({type:"not authorized",message:"invalid token/token expired"})
    }
}
