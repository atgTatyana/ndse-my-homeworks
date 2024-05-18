const express = require('express')
const redis = require("redis")

const app = express()

const REDIS_URL = process.env.REDIS_URL || 'localhost'  // настройка для редиса
const client = redis.createClient({ url: REDIS_URL });  // создаем клиент редиса

(async () => {
  await client.connect()
})()

app.get('/counter/:bookId', async (req, res) => {
    const { bookId } = req.params
    console.log('get', bookId)

    const cnt = await client.get(bookId)
    res.json(cnt)
})

app.post('/counter/:bookId/incr', async (req, res) => {
    const { bookId } = req.params
    console.log('post', bookId)
    try {
        // incr - функция для хранения счетчиков в редисе, возвращает текущее значение счетчика
        // если такого счетчика не было - создаст со значением 1, если был - увеличит на 1
        const cnt = await client.incr(bookId)
        res.json(cnt)       
    } catch (e) {
        res.json({ errcode: 500, errmsg: `redis error ${e}` })
    }
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`)
})
