const express = require('express')
const path = require('path')
const { v4: uuid } = require('uuid')

class Book {
  constructor(title, description, authors, favorite, fileCover, fileName, fileBook, id = uuid()) {
    this.title = title,
    this.description = description,
    this.authors = authors,
    this.favorite = favorite,
    this.fileCover = fileCover,
    this.fileName = fileName,
    this.id = id
  }
}

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

const library = []

books.map((el, idx) => {
  const newBook = new Book(`book ${el.title}`, `desc ${el.description}`, `authors ${el.authors}`,
    `favorite ${idx}`, `fileCover ${idx}`, `fileName ${idx}`)
  library.push(newBook)
})

const router = express.Router()

router.get('/', (req, res) => {    // получить все записи
  res.json(library) 
})

router.get('/:id', (req, res) => {    // получение единственной записи по id
  const {id} = req.params
  const idx = library.findIndex(el => el.id === id)
  
  if( idx !== -1) {
    res.sendFile(path.resolve(__dirname, 'index.html'))

  } else {
    res.status(404)
    res.json('404 | книга не найдена')
  }
})
  
router.post('/', (req, res) => {    // создание новой записи
  const {title, description, authors, favorite, fileCover, fileName} = req.body
  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  library.push(newBook)
  
  res.status(201)
  res.json(newBook)
})

router.put('/:id', (req, res) => {    // обновление записи
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

router.delete('/:id', (req, res) => {     // удаление записи
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
  
module.exports = router
