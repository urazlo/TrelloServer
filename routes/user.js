const express = require('express');
const multer  = require('multer');
// const isAdmin = require('../middlewhares/isAdmin');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');
// const upload = require('../middlewhares/multer');
const upload = multer({ dest: './public' });

router.use(isAuth);

// router.get('/', userController.getUsers);

// router.get('/', isAdmin, userController.getUsers);

// router.post('/', isAdmin, userController.createUser);

// router.get('/:id', userController.getUser);

// router.delete('/:id', userController.deleteUser);

router.patch('/update-avatar', upload.single('avatar'), userController.uploadUserAvatar);

router.patch('/:id', userController.updateUser);

module.exports = router;
