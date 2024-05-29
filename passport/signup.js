const LocalStrategy = require('passport-local').Strategy
const db = require('../db')

module.exports = function(passport) {
  const signup = (username, password, done) => {    // функция регистрации пользователя
    db.users.findByUsername(username, (err, user) => {
  
      if (err) {return done(err)}
  
      if (!user) {
        db.users.addNewUser(username, password, (err, user) => {
          if (err) {return done(err)} 
          return done(null, user)
        })
            
      } else {
        console.log('User already exists')
        if (!db.users.verifyPassword(user, password)) {
          return done(null, false)    // при не соответствии пользователя и пароля
        }
        return done(null, user)
      }
    })
  }

  const options = {
    usernameField: "username",
    passwordField: "password",
  }

  passport.use('signup', new LocalStrategy(options, signup))
}