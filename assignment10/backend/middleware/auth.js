import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const auth = (req,res,next) => {
  try{
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({ msg: 'Authorization header missing' });
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(err){
    return res.status(403).json({ msg: 'Invalid or expired token' });
  }
}
