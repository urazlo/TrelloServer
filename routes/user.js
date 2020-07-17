const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');
const isAdmin = require('../middlewhares/isAdmin');

router.use(isAuth);

router.get('/', userController.getUsers);

// router.get('/', isAdmin, userController.getUsers);

router.post('/', isAdmin, userController.createUser);

// router.get('/:id', userController.getUser);

// router.delete('/:id', userController.deleteUser);

// router.patch('/:id', userController.updateUser);

module.exports = router;
