const data_router = require('express').Router()

const {isAuth, signup, login, createPost, updatePost, deletePost, addComment} = require('../controllers/data_controller')

//register user
data_router.post('/auth/signup', async (req,res) => {
    signup(req,res)
})

//login
data_router.post('/auth/login', async (req,res) => {
    login(req,res)
})

//create a post
data_router.post('/post', isAuth, async (req,res) =>{
    createPost(req,res)
})

//update a post
data_router.post('/update/post/:id', isAuth, async (req,res) =>{
    updatePost(req,res)
})

//delete a post
data_router.post('/delete/post/:id', isAuth, async (req,res) =>{
    deletePost(req,res)
})

//add a comment
data_router.post('/comment/:id', isAuth, async (req,res) =>{
    addComment(req,res)
})

module.exports = data_router