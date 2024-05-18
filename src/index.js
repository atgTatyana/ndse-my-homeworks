const express = require('express')

const booksRouter = require('./routes/book')
const indexRouter = require('./routes/index')
const errorMiddleware = require('./middleware/error')

const app = express()
app.use(express.urlencoded())
app.set("view engine", "ejs")      // подключаем движок-шаблонизатор ejs

app.use('/', indexRouter)
app.use('/books', booksRouter)
app.use(errorMiddleware)    // если роуты '/' и '/books' не сработали

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
