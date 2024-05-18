const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {       // передаем название шаблона главной страницы
        title: 'Главная',       // и объект с данными для главной страницы
    })
})

module.exports = router
