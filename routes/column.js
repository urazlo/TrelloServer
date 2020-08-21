const express = require('express');
// const isAdmin = require('../middlewhares/isAdmin');
const userController = require('../controllers/column');
const router = express.Router();
const isAuth = require('../middlewhares/isAuth');

router.use(isAuth);

router.post('/', userController.createColumn);

router.get('/:id', userController.getColumns);

// router.delete('/:id', userController.deleteColumn);

// router.patch('/:id', userController.updateColumn);

module.exports = router;
