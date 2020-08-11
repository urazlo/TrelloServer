const multer = require('multer');

const upload = {
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public')
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    },
  })
}

module.exports = { upload };
