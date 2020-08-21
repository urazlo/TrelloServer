const express = require('express');
// const isAdmin = require('../middlewhares/isAdmin');
const userController = require('../controllers/board');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');

router.use(isAuth);

router.get('/', userController.getUserBoards);

router.post('/', userController.createBoard);

router.delete('/:id', userController.deleteBoard);

router.patch('/:id', userController.updateBoard);

module.exports = router;
