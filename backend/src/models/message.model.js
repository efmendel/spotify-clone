import mongoose from "mongoose";

const messageSchema =  new mongoose.Schema({
    senderID: { // Clerk user ID
        type: String,
        required: true
    },
    receiverID: { // Clerk user ID
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Message = mongoose.model("Message", messageSchema);