const db = require('../db')

module.exports = function(passport) {

  // используется для сохранения данных пользователя (id) в сеcсии после успешной аутентификации
  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })
    
  // используется для извлечения данных пользователя из сессии по id
  passport.deserializeUser( (id, cb) => {
    db.users.findById(id,  (err, user) => {
      if (err) { return cb(err) }
      cb(null, user)
    })
  })
}