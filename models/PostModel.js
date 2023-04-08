const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is missing"] 
    },
    summary: {
        type: String,
        required: [true, "Summary is missing"]
    },
    content: {
        type: String,
        required: [true, "Content cannot be empty"]
    },
    imageUrl: {
        type: String,
    },
    readingTime: {
        type: String,
    },
    writer: {
        type: String,        
    },
}, {
    timestamps: true,
})

const Post = mongoose.model("post", PostSchema)

module.exports = Post