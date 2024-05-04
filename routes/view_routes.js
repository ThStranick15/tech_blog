const view_router = require('express').Router()
const {User, Post, Comment} = require('../models')

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/signup')
    }

    next()
}

view_router.get('/', async (req,res) => {
    const posts = await Post.findAll()
    console.log(posts)
    res.render('homepage', {
        title: 'The Tech Blog',
        posts: posts
    })
})

view_router.get('/signup', (req,res) => {
    res.render('signup', {
        title: 'Signup',
    })
})

view_router.get('/login', (req,res) => {
    res.render('login', {
        title: 'Login',
    })
})

view_router.get('/dashboard', isAuth, async (req,res) => {
    const posts = await Post.findAll({
        where: {
            userId: req.session.user_id
        }
    })
    console.log(posts)
    res.render('dashboard', {
        title: 'Dashboard',
        posts: posts
    })
})

view_router.get('/newpost', isAuth, (req,res) => {
    res.render('newpost', {
        title: 'Create a new Post',
    })
})

view_router.get('/edit/:id', isAuth, async (req,res) => {
    const id = req.params.id
    const post = await Post.findAll({
        where: {
            id: id
        }
    })
    console.log(post)
    const postTitle = post[0].dataValues.title
    const postText = post[0].dataValues.text
    const postID = post[0].dataValues.id
    res.render('edit', {
        title: 'Edit my Post',
        postTitle: postTitle,
        postText: postText,
        postID: postID
    })
})

view_router.get('/comment/:id', isAuth, (req,res) => {
    const id = req.params.id
    res.render('comment', {
        title: 'Add a Comment',
        id: id
    })
})

view_router.get('/logout', isAuth, (req,res) => {
    req.session.user_id = null
    res.render('homepage', {
        title: 'Homepage',
    })
})

module.exports = view_router