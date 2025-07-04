import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    clerkId: {
        type: String,
        required: true
    }
}, {timestamps: true}); // createdAt, updatedAt

export const User = mongoose.model("User", userSchema);