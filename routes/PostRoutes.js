const express = require('express')

const Post = require('../models/PostModel')

const router = express.Router()

router.post("/create", async (req, res) => {
    try {
    const { title,summary,content,imageUrl,readingTime,writer } = req.body
    const newPost = await Post.create({
        title,summary,content,imageUrl,readingTime,writer
    })
    res.json(newPost)
    } catch(err) {
        res.json({message: err})
    }
})

router.get("/", async (req, res) => {
    try {
    const posts = await Post.find({}).sort({createdAt: -1})
    res.json(posts)
    } catch(err) {
        res.json({message: err})
    }
})

router.get("/post/:id", async (req, res) => {
    try {
    const { id } = req.params
    const post = await Post.findById(id)
    res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

router.put("/post/:id", async (req, res) => {
    try {
    const { id } = req.params
    const { title,summary,content,imageUrl,readingTime } = req.body
    const post = await Post.findByIdAndUpdate(id,
        {title, summary, content, imageUrl, readingTime}, {new: true}
    )
    res.json(post)
    } catch(err) {
        res.json({message: err})
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
    const { id } = req.params
    const deletePost = await Post.findByIdAndDelete(id)
    res.json(deletePost)
    } catch(err) {
        res.json({message: err})
    }
})

module.exports = router