const express = require('express')
const { v4: uuid } = require('uuid')

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

const library = [];

[1, 2, 3].map(el => {
  const newBook = new Book(`book ${el}`, `desc ${el}`, `authors ${el}`, `favorite ${el}`,
    `fileCover ${el}`, `fileName ${el}`, `fileBook ${el}`)
  library.push(newBook)
})
  
router.get('/', (req, res) => {
  res.render("books/index", {      // передаем название шаблона, который должен отрисоваться
    title: "Books",             // и объект с данными (для динамичеких вставок в файлах .ejs)
    books: library,
  })
})
  
router.get('/:id', (req, res) => {    // получение книги по её идентификатору
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)
  
  if (idx === -1) {
    res.redirect('/404')
  }

  res.render("books/view", {
    title: "Book | view",
    book: library[idx],
  })  
})

router.get('/create', (req, res) => {   // вывод пустой формы для создания новой книги
  res.render("books/create", {
    title: "Book | create",
    book: {},
  })
})

router.post('/create', (req, res) => {      // создание новой книги
  const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName, fileBook)
  library.push(newBook)

  res.redirect('/books')
})

router.get('/update/:id', (req, res) => {   // вывод формы редактирования книги по идентификатору
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  } 

  res.render("books/update", {
    title: "Book | update",
    book: library[idx],
  })
})

router.post('/update/:id', (req, res) => {      // обновляем книгу после редактирования
  const {id} = req.params
  const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body

  const idx = library.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  } 

  library[idx] = {
    ...library[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook,
  }
  res.redirect(`/books/${id}`)
})

router.post('/delete/:id', (req, res) => {      // удаление книги по идентификатору
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)

  if (idx === -1) {
    res.redirect('/404')
  } 

  library.splice(idx, 1)
  res.redirect(`/books`)
})
  
module.exports = router