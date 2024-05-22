const { Router } = require('express')
const { createPost, getPosts, getPost, getCatPosts, getUserPosts, editPost, deletePost } = require('../controllers/postControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = Router()

router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/users/:id', getUserPosts)
router.get('/categories/:category', getCatPosts)
router.post('/', authMiddleware, createPost)
router.patch('/:id', authMiddleware, editPost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router