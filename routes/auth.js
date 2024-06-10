const express = require('express')
const router = express.Router()

module.exports = function(passport) {
  
  router.get('/', (req, res) => {    // домашняя страница
    res.redirect('/')
  })
  
  router.get('/login', (req, res) => {   // выводит форму авторизации
    res.render('login')
  })
  
  router.post('/login',    // авторизация пользователя
    passport.authenticate('local', { failureRedirect: '/api/user/login' }),
    (req, res) => {    // если пользователь успешно авторизован
      console.log("req.user: ", req.user)
      res.redirect('/')
    }
  )

  router.get('/logout', (req, res) => {
    req.logout(req.user, err => {
      if(err) return next(err)
      res.redirect('/')
    })
  })

  router.get('/me',     // получить профиль пользователя
    (req, res, next) => {
      if (!req.isAuthenticated()) {   // если нет авторизированного пользователя
        return res.redirect('/api/user/login')
      }
      next()
    },
    (req, res) => {     // если есть авторизированный пользователь
      res.render('profile', { user: req.user })
    }
  )

  router.get('/signup', (req, res) => {     // выводит форму регистрации
    res.render('signup')
  })

  router.post('/signup',      // регистрация нового пользователя
    passport.authenticate('signup',
    { failureRedirect: '/api/user/signup' }),
    (req, res) => {
      console.log("req.user: ", req.user)
      res.redirect('/')
    }
  )

  return router
}
