const express = require('express')
const Book = require('../models/books')
const router = express.Router()
  
router.get('/', async (req, res) => {
  res.redirect('/')
})

router.get('/create', (req, res) => {   // вывод пустой формы для создания новой книги
  res.render("books/create", {
    title: "Book | create",
    book: {},
  })
})

router.post('/create', async (req, res) => {      // создание новой книги
  try {
    const newBook = new Book(req.body)
    await newBook.save()
    res.redirect('/books')
    
  } catch (error) {
    console.log(error)
    res.redirect('/create')
  }
})
  
router.get('/:id', async (req, res) => {    // получение книги по её идентификатору
  const {id} = req.params
  try {
    const book = await Book.findById(id).select('-__v')
    if (book === null) {    // если нет такого id
      res.redirect('/404')

    } else {
      res.render('books/view', {
        title: 'Book | view',
        book,
        user: req.user,
      }) 
    }
  } catch (e) {
    console.log(error)
    res.redirect("")
  } 
})

router.get('/update/:id', async (req, res) => {   // вывод формы редактирования книги по идентификатору
  const {id} = req.params
  try {
    const book = await Book.findById(id).select('-__v')

    if (book) {
      res.render('books/update', {
        title: 'Book | update',
        book,
      })
    } else {
      res.redirect('/404')
    }

  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/update/:id', async (req, res) => {      // обновляем книгу после редактирования
  const {id} = req.params
  try {
    const book = await Book.findByIdAndUpdate(id, req.body)

    res.redirect("/books")
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.post('/delete/:id', async (req, res) => {      // удаление книги по идентификатору
  const {id} = req.params

  try {
    const book = await Book.findByIdAndDelete(id)

    if (book) {
      res.redirect('/books')
    } else {
      res.redirect('/404')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})
  
module.exports = router