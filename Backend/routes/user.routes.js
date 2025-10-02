import express from 'express';
import authController from '../controllers/auth.controller.js'
import { body } from 'express-validator';


const router = express.Router();


// Routes for User authentication

router.post('/register',
    [
        body('username').isLength({min : 3}).withMessage("Username must contain 3 characters"),
        body('email').isEmail().withMessage("Email must be valid email address"),
        body('password').isLength({min : 8}).withMessage("Password must contain minimum 8 characters"),
        body('role').optional().isIn(['user', 'admin']).withMessage("Role must be either 'user' or 'admin'"),
    ],    
    authController.userRegister);

router.post('/login', authController.userLogin);



export default router;
