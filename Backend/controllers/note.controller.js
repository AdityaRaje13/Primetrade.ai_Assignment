import noteModel from "../models/note.model.js";
import { validationResult } from "express-validator";

// Get all notes for a user
const getNotes = async(req, res) => {

    try {

        const notes = await noteModel.find({user : req.user._id}).sort({createdAt : -1});

        return res.status(200).json({notes});

    } 
    catch (error) {
        res.status(400).json({error});
    }

}

// Create a new note
const createNote = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {title, content} = req.body;

        const create_note = await noteModel.create({
            title : title,
            content : content,
            user : req.user._id,
        })

        return res.status(200).json({Note : create_note});
    } 
    catch (error) {
        res.status(400).json({error});
    }

}

// Get single note
const getNote = async(req, res) => {

    try {

        const {id} = req.params;

        const note = await noteModel.findOne({_id : id, user : req.user._id});

        if(!note){
            return res.status(404).json({
                error : "Note not found",
            })
        }

        return res.status(200).json({note});

    } 
    catch (error) {
        res.status(400).json({error});
    }

}

// Update note
const updateNote = async(req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;
        const {title, content} = req.body;

        const note = await noteModel.findOne({_id : id, user : req.user._id});

        if(!note){
            return res.status(404).json({
                error : "Note not found",
            })
        }

        const updated_note = await noteModel.findByIdAndUpdate(
            id,
            {
                title : title,
                content : content,
                updatedAt : Date.now(),
            },
            {new : true}
        )

        return res.status(200).json({Note : updated_note});

    } 
    catch (error) {
        res.status(400).json({error});
    }

}

// Delete note
const deleteNote = async(req, res) => {

    try {

        const {id} = req.params;

        const note = await noteModel.findOne({_id : id, user : req.user._id});

        if(!note){
            return res.status(404).json({
                error : "Note not found",
            })
        }

        await noteModel.findByIdAndDelete(id);

        return res.status(200).json({msg : "Note deleted successfully"});

    } 
    catch (error) {
        res.status(400).json({error});
    }

}

export default {getNotes, createNote, getNote, updateNote, deleteNote};