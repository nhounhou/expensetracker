import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    creator: String,
    amount: {
        type: Number,
        default: 0,
    },
    selectedFile: String,
    date: {
        type: Date,
        default: new Date(),
    },
    expenseType: String,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostExpense', postSchema);

export default PostMessage;