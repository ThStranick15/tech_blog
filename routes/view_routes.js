const view_router = require('express').Router()
const {isAuth, home, signup, login, dashboard, newpost, viewpost, editpost, comment, logout} = require ('../controllers/view_controller')

view_router.get('/', async (req,res) => {
    home(req,res)
})

view_router.get('/signup', (req,res) => {
    signup(req,res)
})

view_router.get('/login', (req,res) => {
    login(req,res)
})

view_router.get('/dashboard', isAuth, async (req,res) => {
    dashboard(req,res)
})

view_router.get('/newpost', isAuth, (req,res) => {
    newpost(req,res)
})

view_router.get('/viewpost/:id', isAuth, async (req,res) => {
    viewpost(req,res)
})

view_router.get('/edit/:id', isAuth, async (req,res) => {
    editpost(req,res)
})

view_router.get('/comment/:id', isAuth, (req,res) => {
    comment(req,res)
})

view_router.get('/logout', isAuth, (req,res) => {
    logout(req,res)
})

module.exports = view_router