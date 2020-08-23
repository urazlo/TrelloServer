const express = require('express');
// const isAdmin = require('../middlewhares/isAdmin');
const userController = require('../controllers/card');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');

router.use(isAuth);

router.post('/', userController.createCard);

router.get('/', userController.getCards);

router.patch('/:id', userController.updateCard);

// router.delete('/:id', userController.deleteCard);

module.exports = router;
