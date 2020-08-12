const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/usersAvatars',
  filename: (req, file, next) => {
    next(null, file.fieldname + '-' + Date.now());
  },
});

const avatarUpload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, next) => {
    const fileExt = path.extname(file.originalname.toLowerCase());

    if (!fileExt.match(/\.(jpg|jpeg|png)$/)) {
      return next('Error: Not a valid image format!');
    }

    // return next( new multer.MulterError("LIMIT_UNEXPECTED_FILE") , false);

    next(null, true);
  }
}).single('avatar');

module.exports = avatarUpload;