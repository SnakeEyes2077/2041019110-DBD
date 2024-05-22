const Post = require('../models/postmodel')
const User = require("../models/userModel")
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel')
const { response } = require('express')

// CREATE A POST
// GET : api/posts/create
// PROTECTED
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description || !req.files) {
            return next(new HttpError("Fill in all fields and choose thumbnail.", 422))
        }
        const { thumbnail } = req.files;
        // check the files size
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail too big. File should be less than 2mb."))
        }
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.')
        let newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFilename), async (err) => {
            if (err) {
                return next(new HttpError(err))
            } else {
                let newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id })
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created.", 422))
                }
                //find user and increate post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })

                res.status(201).json(newPost)
            }
        })
    } catch (error) {
        return next(new HttpError(Error))
    }
}

// GET ALL POSTS
// GET : api/posts/getall
// UNPROTECTED
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(Error))
    }
}

// GET SINGLE POST
// GET : api/posts:id
// UNPROTECTED
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError("Post not found.", 404))
        }
        res.status(200).json(post)
    } catch (error) {
        return next(new HttpError(error))
    }
}

// GET POSTS BY CATEGORY
// GET : api/posts/categories/:category 
// UNPROTECTED
const getCatPosts = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 })
        res.status(200).json(catPosts)
    } catch (error) {
        return next(new HttpError(erroe))
    }
}

// GET USER / AUTHOR POST
// GET : api/posts/users/:id
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
    try {
        let { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

// EDIT POST
// PATCH : api/posts/:id
// UNPROTECTED
const editPost = async (req, res, next) => {
    try {
        let fileName; let newFilename; let updatedPost;
        // ReactQuill has a paragraph opening and closing tag with a break tag in between so there are 11 characters in there already
        const postId = req.params.id;
        let { title, category, description } = req.body;
        if (!title || !category || description.length < 12) {
            return next(new HttpError("Fill in all fields.", 422))
        }
        const oldPost = await Post.findById(postId);
        if (req.user.id == post.creator) {
            if (!req.files) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true })
            } else {
                //get old post from database
                //delete old thumbnail from uplaod
                fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                    if (err) {
                        return next(new HttpError(err))
                    }
                })
                //upload new thumbnail
                const { thumbnail } = req.files;
                //check file size
                if (thumbnail.size > 2000000) {
                    return next(new HttpError("Thumbnail too big. Should be less than 2mb"))
                }
                fileName = thumbnail.name;
                let splittedFilename = fileName.split('.')
                newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
                thumbnail.mv(path.join(__dirname, '.', 'uploads', newFilename), async (err) => {
                    if (err) {
                        return next(new HttpError(err))
                    }
                })
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: newFilename }, { new: true })
            }
        }
        if (!updatedPost) {
            return next(new HttpError("Couldn't update post.", 400))
        }
        res.status(200).json(updatedPost)
    } catch (error) {
        return next(new HttpError(error))
    }
}

// EDIT POST
// DELETE : api/posts/:id
// PROTECTED
const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError("Post unavailabe.", 400))
        }
        const post = await Post.findById(postId);
        const fileName = post?.thumbnail;
        if (req.user.id == post.creator) {
            fs.unlink(path.join(__dirname, '..', 'uploads', fileName), async (err) => {
                if (err) {
                    return next(new HttpError(err));
                } else {
                    await Post.findByIdAndDelete(postId)
                    // reduce post count by 1
                    let currentUser = await User.findById(req.user.id);
                    let userPostCount = currentUser?.posts - 1;
                    await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
                    res.json(`Post ${postId} deleted successfully.`)
                }
            })
        } else {
            return next(new HttpError("Post couldn't be deleted", 403))
        }
    } catch (error) {
        return next(new HttpError(error))
    }
}

module.exports = { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost }