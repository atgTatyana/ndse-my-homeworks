const multer = require('multer')

const storage = multer.diskStorage({
  destination(req, file, cb){     // куда будет записываться файл
      cb(null, 'fileBook')
  },
  filename(req, file, cb) {       // под каким именем будет записан файл
      cb(null, `${file.originalname}`)
  }
})

module.exports = multer({storage}) 