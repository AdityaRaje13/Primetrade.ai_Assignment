import mongoose from "mongoose";

export const Connection = () => {

    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Assignment",
    })
    .then(() => {
        console.log("Successfully Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })
};