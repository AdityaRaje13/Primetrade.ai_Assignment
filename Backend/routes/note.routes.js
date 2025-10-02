import express from 'express';
import noteController from '../controllers/note.controller.js'
import { body } from 'express-validator';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Routes for Notes CRUD

router.get('/', authMiddleware.authUser, noteController.getNotes);

router.post('/create',
    authMiddleware.authUser,
    [
        body('title').isLength({min : 3}).withMessage("Title must contain 3 characters"),
        body('content').isLength({min : 10}).withMessage("Content must contain minimum 10 characters"),
    ],    
    noteController.createNote);

router.get('/:id', authMiddleware.authUser, noteController.getNote);

router.put('/update/:id',
    authMiddleware.authUser,
    [
        body('title').isLength({min : 3}).withMessage("Title must contain 3 characters"),
        body('content').isLength({min : 10}).withMessage("Content must contain minimum 10 characters"),
    ],
    noteController.updateNote);

router.delete('/delete/:id', authMiddleware.authUser, noteController.deleteNote);

export default router;