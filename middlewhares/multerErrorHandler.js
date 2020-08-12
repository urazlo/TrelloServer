const multer = require('multer');
const fs = require('fs');

const errorHandler = (err, req, res, next) => {
  console.log(req.user.avatar);
  console.log(req.file);
  const newPath = req.user.avatar.replace('http://localhost:4000/', 'public/')
  if (err instanceof multer.MulterError) {
    if (fs.existsSync(newPath)) { console.log('trash deleted'); fs.unlinkSync(newPath); }
    return res.status(400).send('Invalid File. Format must be PNG,JPG,JPEG')
  } else next();
};

module.exports = errorHandler;
