const express = require('express')
const { v4: uuid } = require('uuid')
const fileMulter = require('../middleware/file')

const router = express.Router()

class Book {
  constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = uuid()) {
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName,
    this.fileBook = fileBook,
    this.id = id
  }
}

const library = []

router.post('/user/login', (req, res) => {
  res.status(201)
  res.json({ id: 1, mail: "test@mail.ru" })
})
  
router.get('/books', (req, res) => {
  res.json(library) 
})
  
router.get('/books/:id', (req, res) => {
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)
  
  if( idx !== -1) {
    res.json(library[idx])
  } else {
    res.status(404)
    res.json('404 | книга не найдена')
  }
})

router.get('/books/:id/download', (req, res) => {
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)

  if( idx !== -1) {
    res.download(__dirname+'/../fileBook/'+library[idx].fileBook, (err) => {
      if (err){
        res.status(404)
      }
    })
  } else {
    res.status(404)
    res.json('404 | книга не найдена')
  } 
})  
  
router.post('/books',
  fileMulter.single('file-book'),
  (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
    const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
    library.push(newBook)
  
    res.status(201)
    res.json(newBook)
  })
  
router.put('/books/:id',
  fileMulter.single('file-book'),
  (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body
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
        fileName,
        fileBook
      }
  
      res.json(library[idx])
    } else {
      res.status(404)
      res.json('404 | книга не найдена')
    }
  })
  
router.delete('/books/:id', (req, res) => {
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

module.exports = {
  router,
  library,
  Book
}
