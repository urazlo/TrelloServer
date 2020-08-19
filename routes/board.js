const express = require('express');
// const isAdmin = require('../middlewhares/isAdmin');
const userController = require('../controllers/board');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');

router.use(isAuth);

router.post('/', userController.createBoard);

// router.patch('/:id', userController.updateBoard);

module.exports = router;
