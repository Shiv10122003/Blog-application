import jwt from 'jsonwebtoken';

export const authMiddleware =(req,res,next)=>{
 try{
   const authHeader = req.header('Authorization');
  if(!authHeader){
    return res.status(401).json({
      message: "No authorization header,access denied"
    })
  }
  const  token = authHeader.replace('Bearer ','');
  if(!token){
    return res.status(401).json({
       message: "No token provided,authorization denied"
    });
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET);

  req.user ={
    id: decoded.id,
    email: decoded.email,
    name: decoded.name
  }
 
  next();
 }
 catch(error){
     console.error("Auth Middleware Error:", error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        message: "Invalid token"
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expired"
      });
    }
    
    return res.status(500).json({
      message: "Server error during authentication",
      error: error.message
    });
    
 }
}