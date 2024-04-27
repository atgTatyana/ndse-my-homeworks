const express = require('express')

const { router: indexRouter, library, Book } = require('./routes/index')
console.log(library, Book)

const app = express()
app.use(express.json())

app.use('/api', indexRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT)
