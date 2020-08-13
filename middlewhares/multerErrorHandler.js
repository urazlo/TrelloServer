const multer = require('multer');

module.exports = async (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).send('Invalid File. Format must be PNG,JPG,JPEG')
  } else next();
};
