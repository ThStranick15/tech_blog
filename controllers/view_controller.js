const {User, Post, Comment} = require('../models')

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/signup')
    }

    next()
}

async function home(req,res){
    const posts = await Post.findAll()
    console.log(posts)
    res.render('homepage', {
        title: 'The Tech Blog',
        posts: posts
    })
}
function signup(req,res){
    res.render('signup', {
        title: 'Signup',
    })
}

function login(req,res){
    res.render('login', {
        title: 'Login',
    })
}

async function dashboard(req,res){
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
}

function newpost(req,res){
    res.render('newpost', {
        title: 'Create a new Post',
    })
}

async function viewpost(req,res){
    const id = req.params.id
    const post = await Post.findAll({
        where: {
            id: id
        }
    })
    const postTitle = post[0].dataValues.title
    const postText = post[0].dataValues.text
    const postID = post[0].dataValues.id
    const postDate = post[0].dataValues.date
    const userId = post[0].dataValues.userId
    const user = await User.findAll({
        where: {
            id: userId
        }
    })
    const username = user[0].dataValues.username
    const comments = await Comment.findAll({
        where: {
            postId: postID
        },
        include: User
        
    })
    const plainComments = comments.map(obj => obj.get({ plain: true }))
    res.render('viewpost', {
        title: 'Post',
        postTitle: postTitle,
        postText: postText,
        postID: postID,
        postDate: postDate,
        username: username,
        comments: plainComments //fix username
    })
}

async function editpost(req,res){
    const id = req.params.id
    const post = await Post.findAll({
        where: {
            id: id
        }
    })
    const postTitle = post[0].dataValues.title
    const postText = post[0].dataValues.text
    const postID = post[0].dataValues.id
    res.render('edit', {
        title: 'Edit my Post',
        postTitle: postTitle,
        postText: postText,
        postID: postID
    })
}

function comment(req,res){
    const id = req.params.id
    res.render('comment', {
        title: 'Add a Comment',
        id: id
    })
}

function logout(req,res){
    req.session.user_id = null
    res.render('homepage', {
        title: 'Homepage',
    })
}


module.exports = {isAuth, home, signup, login, dashboard, newpost, viewpost, editpost, comment, logout}