const express = require ('express')
const {engine} = require('express-handlebars')

require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3333

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./routes')

const client = require('./db/client')

//allow url encoded data, extended allows other data types
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//setup handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: client,
      }),
    //cookie: { secure: true }
  }))

//load all routes
app.use('/', routes)

//connect database and start listening/ start server
client.sync({force: false})
.then(() =>{
    app.listen(PORT, () => console.log('Listening on port:', PORT))
}
)