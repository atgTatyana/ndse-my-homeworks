const express = require('express')
const { v4: uuid } = require('uuid')

class Book {
  constructor(title, description, authors, favorite, fileCover, fileName, id = uuid()) {
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName,
    this.id = id
  }
}

const library = []

const app = express()
app.use(express.json())

app.post('/api/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})

app.get('/api/books', (req, res) => {
  res.json(library) 
})

app.get('/api/books/:id', (req, res) => {
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.json(library[idx])
  } else {
    res.status(404)
    res.json('404 | книга не найдена')
  }
})

app.post('/api/books', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  library.push(newBook)

  res.status(201)
  res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)

  if (idx !== -1){
    library[idx] = {
      ...library[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName
    }

    res.json(library[idx])
  } else {
    res.status(404)
    res.json('404 | книга не найдена')
  }
})

app.delete('/api/books/:id', (req, res) => {
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)
   
  if(idx !== -1){
      library.splice(idx, 1)
      res.json('ok')
  } else {
      res.status(404)
      res.json('404 | книга не найдена')
  }
})

const PORT = process.env.PORT || 3000
app.listen(PORT)
