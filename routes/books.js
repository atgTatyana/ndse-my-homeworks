const express = require('express')
const path = require('path')
const Book = require('../models/books')

const books = [
  {
    title: "Доктор Живаго", 
    description: "Через трагическую историю жизни главного героя, попавшего в чудовищный круговорот исторических событий - революция, Гражданская война, - показана жизнь как таковая, её глубинные потайные механизмы, её загадочная суть, её взлёты и падения.",
    authors: "Б. Пастернак",
  },
  {
    title: "Мастер и Маргарита", 
    description: "История о дьяволе и его свите, почтивших своим присутствием Москву 1930-х, о прокураторе Иудеи всаднике Понтии Пилате и нищем философе Иешуа Га-Ноцри, о талантливом и несчастном Мастере и его прекрасной и верной возлюбленной Маргарите.",
    authors: "М. Булгаков",
  }
]

books.map((el) => {
  const newBook = new Book({
    title: el.title, 
    description: el.description,
    authors: el.authors,
    favorite: el.favorite,
    fileCover: el.fileCover,
    fileName: el.fileName,
  })
  newBook.save() 
})

const router = express.Router()

router.get('/', async (req, res) => {     // получить все записи
  try {
    const books = await Book.find().select('-__v')
    res.json(books)
  } catch (e) {
    res.status(500).json(e)
  }
})
  
router.get('/:id', async (req, res) => {    // получение единственной записи по id
  const {id} = req.params
  
  try {
    const book = await Book.findById(id).select('-__v')
    
    if (book === null) {    // если нет такого id
      res.status(404)
      res.json('404 | книга не найдена')
      
    } else {
      res.json(book)
    }
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/', async (req, res) => {    // создание новой записи
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book({
    title, 
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  })

  try {
    await newBook.save()       // сохранить новую запись в базу
    res.json(newBook)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.put('/:id', async (req, res) => {    // обновление записи
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const {id} = req.params

  try {
    await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName})
    res.redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(500).json(e)
  }  
})
  
router.delete('/:id', async (req, res) => {   // удаление записи
  const {id} = req.params
    
  try {
    await Book.deleteOne({_id: id})     // фильтр для удаления
    res.json('ok')
  } catch (e) {
    res.status(500).json(e)
  }
})

module.exports = router
