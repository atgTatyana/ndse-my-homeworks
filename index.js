const express = require('express')
const mongoose = require('mongoose')

const errorMiddleware = require('./middleware/error')

const indexRouter = require('./routes/index')

const app = express()
app.use(express.json())

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