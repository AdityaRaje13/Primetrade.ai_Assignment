import userModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken';

// Register the user
const userRegister = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {username, email, password, role} = req.body;

        const userExist = await userModel.findOne({email});

        if(userExist){
            return res.status(400).json({
                error : "User already Exists",
            })
        }

        const hash_pass = await bcrypt.hash(password, 10);

        const create_user = await userModel.create({
            username : username,
            email : email,
            password : hash_pass,
            role : role || 'user', // Use provided role or default to 'user'
        })

        return res.status(200).json({User : create_user})  
    } 
    catch (error) {
        res.status(400).json({error});
    }

}


// Login the User
const userLogin = async(req, res) => {
  
    try {

        const { email , password } = req.body;

        // Check Email
        const validEmail = await userModel.findOne({email}).select('+password');
        if(!validEmail){
            return res.status(400).json({
                error : "Invalid Credentials",
            })
        }

        // Check password
        const validPassword = await bcrypt.compare(password, validEmail.password);

        if(!validPassword){
            return res.status(400).json({
                error : "Invalid Credentials",
            })
        }

        // Generate JWT
        const token =  jwt.sign({id: validEmail._id, email : validEmail.email, role: validEmail.role}, process.env.JWT_SECRET, {expiresIn : '1d'});
        
        return res.status(200).json({
            msg : "Login successful",
            user : validEmail,
            token
        })
    }
     catch (error) {
        res.json({error});
    }
}

export default {userRegister, userLogin } 