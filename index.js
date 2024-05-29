const express = require('express')
const mongoose = require('mongoose')

const session = require('express-session')
const passport = require('passport')

const local = require('./passport/login')(passport)
const signup = require('./passport/signup')(passport)

const init = require('./passport/init')(passport)

const errorMiddleware = require('./middleware/error')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')(passport)

const app = express()

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.use(session({ secret: 'SECRET'}));
  
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', authRouter)
app.use('/api/books', indexRouter)

app.use(errorMiddleware)

async function start(PORT, UrlDB) {     // запуск приложения
    try {
        await mongoose.connect(UrlDB)      // подключение к БД
        app.listen(PORT, () => {        // запускаем наш сервер
            console.log(`Server listening on port ${PORT}.`)
        })        
    } catch (e) {
        console.log(e)
    }
}

const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000
start(PORT, UrlDB)