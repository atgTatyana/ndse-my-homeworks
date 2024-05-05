module.exports = ((req, res) => {
  res.render('errors/404', {      // отрисовываем шаблон errors/404
    title: '404'
  })
})