import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        required : true,
        unique : true,
        minLength : [3, "Username must contain atleast 3 characters"], 
        maxLength : [15, "Username cannot exceed 50 characters"],
    },

    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        minLength : [12, "Email must contain atleast 12 characters"], 
        maxLength : [50, "Email cannot exceed 50 characters"],
    },

    password : {
        type : String,
        required : true,
        minLength : [8, "Password must contain atleast 8 characters"],
        selected : false,
    },

    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user',
        required : true,
    },

  
})


const userModel = mongoose.model('User',userSchema);

export default userModel;