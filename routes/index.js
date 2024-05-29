const express = require('express')
const Books = require('../models/books')

const router = express.Router()

router.get('/', async (req, res) => {     // получить все записи
  try {
    const books = await Books.find().select('-__v')
    res.json(books)
  } catch (e) {
    res.status(500).json(e)
  }
})
  
router.get('/:id', async (req, res) => {    // получение единственной записи по id
  const {id} = req.params
  
  try {
    const book = await Books.findById(id).select('-__v')
    
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

  const newBook = new Books({
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
    await Books.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName})
    res.redirect(`/api/books/${id}`)
  } catch (e) {
    res.status(500).json(e)
  }  
})
  
router.delete('/:id', async (req, res) => {   // удаление записи
  const {id} = req.params
    
  try {
    await Books.deleteOne({_id: id})     // фильтр для удаления
    res.json('ok')
  } catch (e) {
    res.status(500).json(e)
  }
})

module.exports = router
