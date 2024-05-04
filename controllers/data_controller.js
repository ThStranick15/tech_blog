const {User, Post, Comment} = require('../models')

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/register')
    }

    next()
}

async function signup(req,res){
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
}

async function login(req,res){
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
}

async function createPost(req,res){
    console.log(Post)
    const {title, text} = req.body
    const date = new Date().toDateString()
    const id = req.session.user_id
    await Post.create({title: title, text: text, date: date, userId: id})

    res.redirect('/dashboard')
}

async function updatePost(req,res){
    const id = req.params.id
    const {title, text} = req.body
    await Post.update(
            {
                title: title,
                text: text
            },{
            where: {
                id: id
            }}
    )

    res.redirect('/dashboard')
}

async function deletePost(req,res){
    const id = req.params.id
    await Post.destroy({
        where: {
            id: id
        }
})

res.redirect('/dashboard')
}

async function addComment(req,res){
    const id = req.params.id
    const userId = req.session.user_id
    const {comment} = req.body
    const date = new Date().toDateString()
    await Comment.create({text: comment, date:date, postId: id, userId: userId})

    res.redirect(`/viewpost/${id}`)
}

module.exports = {isAuth, signup, login, createPost, updatePost, deletePost, addComment}