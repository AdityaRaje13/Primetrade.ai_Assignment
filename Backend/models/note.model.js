import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true,
        minLength : [3, "Title must contain atleast 3 characters"], 
        maxLength : [100, "Title cannot exceed 100 characters"],
    },

    content : {
        type : String,
        required : true,
        minLength : [10, "Content must contain atleast 10 characters"], 
        maxLength : [1000, "Content cannot exceed 1000 characters"],
    },

    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },

    createdAt : {
        type : Date,
        default : Date.now,
    },

    updatedAt : {
        type : Date,
        default : Date.now,
    },

})

const noteModel = mongoose.model('Note', noteSchema);

export default noteModel;