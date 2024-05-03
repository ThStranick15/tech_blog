const data_router = require('express').Router()
const {User, Post, Comment} = require('../models')

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/register')
    }

    next()
}

//register user
data_router.post('/auth/signup', async (req,res) => {
    try{
        const data = req.body
        const user = await User.create(data) //creates intert statement for you

        //store info to server, so we have active record of user data
        //allows us to know when they return if their data is active then they are logged in (auth)
        req.session.user_id = user.id 

        res.redirect('/dashboard')

    }catch (err) {
        console.log(err)
        //redirect user back to register page
        res.redirect('/signup')
    }
})

data_router.post('/auth/login', async (req,res) => {
    const {username, password} = req.body
        const user = await User.findOne({
            where: {
                username: username
            }
        }) 

        if(!user) return res.redirect('/signup')

        const valid_pass = await user.validatePass(password)

        if(!valid_pass) return res.redirect('/login')

        req.session.user_id = user.id
        res.redirect('/dashboard')
})

//get all posts to display
data_router.get('/posts', async (req,res) => {
    const posts = await Post.findAll()
})

//create a post
data_router.post('/post', async (req,res) =>{
    console.log('here')
    console.log(Post)
    const {title, text} = req.body
    const date = new Date().toDateString()
    const id = req.session.user_id
    const newPost = await Post.create({title: title, text: text, date: date, userId: id})

    res.redirect('/dashboard')
})

module.exports = data_router