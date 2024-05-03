const view_router = require('express').Router()

function isAuth(req,res,next){
    if(!req.session.user_id){
        return res.redirect('/signup')
    }

    next()
}

view_router.get('/', (req,res) => {
    res.render('homepage', {
        title: 'The Tech Blog',
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

view_router.get('/dashboard', /*isAuth,*/ (req,res) => {
    res.render('dashboard', {
        title: 'Dashboard',
    })
})

view_router.get('/logout', isAuth, (req,res) => {
    req.session.user_id = null
    res.render('homepage', {
        title: 'Homepage',
    })
})

module.exports = view_router