const express = require('express')
const mongoose = require('mongoose')

const session = require('express-session')
const passport = require('passport')
const local = require('./passport/login')(passport)
const signup = require('./passport/signup')(passport)
const init = require('./passport/init')(passport)

const errorMiddleware = require('./middleware/error')

const booksRouter = require('./routes/books')
const ejsRouter = require('./routes/ejsBooks')
const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')(passport)

const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)
const io = socketIO(server)

app.use(express.json())
app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.use(session({ secret: 'SECRET'}));
  
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', authRouter)
app.use('/api/books', booksRouter)
app.use('/', indexRouter)
app.use('/books', ejsRouter)

io.on('connection', (socket) => {   // при наступлении события connection
    const {id} = socket
    console.log(`Socket connected: ${id}`)

    const {roomName} = socket.handshake.query  
    console.log(`Socket roomName: ${roomName}`)

    socket.join(roomName)       // подписываемся на события данной комнаты
    socket.on('message-to-room', (msg) => {
        msg.type = `room: ${roomName}`
        socket.to(roomName).emit('message-to-room', msg)   // отправка сообщения в комнату
        socket.emit('message-to-room', msg)
    })

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${id}`)
    })
})

app.use(errorMiddleware)

async function start(PORT, UrlDB) {     // запуск приложения
    try {
        await mongoose.connect(UrlDB)      // подключение к БД
        server.listen(PORT, () => {        // запускаем наш сервер
            console.log(`Server listening on port ${PORT}.`)
        })        
    } catch (e) {
        console.log(e)
    }
}

const UrlDB = process.env.UrlDB
const PORT = process.env.PORT || 3000
start(PORT, UrlDB)