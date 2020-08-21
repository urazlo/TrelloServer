const { Board } = require('../models');

async function getUserBoards(req, res) {
  try {
    const userBoards = await Board.findAll({ where: { userId: req.user.id } });
    res.json(userBoards);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createBoard = async (req, res) => {
  try {
    let { title } = req.body;

    let board = await Board.create({ title, userId: req.user.id });

    board = board.toJSON();
    res.json(board);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// const updateBoard = async (req, res) => {
//   try {
//     const { id } = req.user;

//     let { title } = req.body;

//     if (id !== req.user.id && req.user.role !== 'admin') {
//       return res.sendStatus(403);
//     }

//     if (!title) { return res.sendStatus(400); }

//     let [, [updatedBoard]] = await db.Board.update(
//       title,
//       { where: { id }, returning: true, individualHooks: true });

//     updatedBoard = updatedBoard.toJSON();

//     res.json(updatedUser);
//   }
//   catch (err) {
//     const message = errorHandler(err);

//     if (message) { return res.status(400).send(message); }

//     console.error(err);
//     res.sendStatus(500);
//   }
// };


// async function deleteBoard(req, res) {
//   try {
//     const { id } = req.params;

//     if (id !== req.user.id && req.user.role !== 'admin') {
//       return res.sendStatus(403);
//     }
    
//     await Board.destroy({ where: { id } });


//     res.sendStatus(204);
//   }
//   catch (err) {
//     const message = errorHandler(err);

//     if (message) {
//       return res.status(400).send(message);
//     }

//     console.error(err);
//     res.sendStatus(500);
//   }
// };

module.exports = {
  createBoard,
  getUserBoards,
  // updateBoard,
  // deleteBoard,
};
