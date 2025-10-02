import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';


const authUser = async(req, res, next) => {

    try {

        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({msg : "User not authenticated"}); 
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({ msg: "User not found" });
        }

        req.user = user;
        next();
        
    } 
    catch (error) {
        return res.status(401).json({ msg: "Invalid or expired token" });
    }
  
}


export default {authUser };



