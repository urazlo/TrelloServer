const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './public/usersAvatars',
  filename: (req, file, next) => {
    next(null, file.fieldname + '-' + Date.now());
  },
});

const avatarUpload = multer({
  fileFilter: (req, file, next) => {
    const fileExt = path.extname(file.originalname.toLowerCase());
    if (!fileExt.match(/\.(jpg|jpeg|png)$/)) {
      return next(new multer.MulterError("LIMIT_UNEXPECTED_FILE", file), false);
    }

    next(null, true);
  },
  limits: { fileSize: 1000000 },
  storage,
}).single('avatar');

module.exports = avatarUpload;
