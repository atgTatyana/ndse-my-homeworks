const LocalStrategy = require('passport-local').Strategy
const db = require('../db')

module.exports = function(passport) {
  const verify = (username, password, done) => {      // функция верифицирует пользователя
    db.users.findByUsername(username, (err, user) => {
      if (err) {return done(err)}       // при ошибке БД
  
      if (!user) { return done(null, false) }   // при отсутствии пользователя
    
      if (!db.users.verifyPassword(user, password)) {
        return done(null, false)    // при не соответствии пользователя и пароля
      }
    
      return done(null, user)   // при удачной аутентификации
    })
  }

  const options = {
    usernameField: "username",
    passwordField: "password",
  }
    
  passport.use('local', new LocalStrategy(options, verify)) 
}