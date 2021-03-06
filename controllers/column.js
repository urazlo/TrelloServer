const { Column } = require('../models');

async function getColumns(req, res) {
  try {
    const { id } = req.params;
    const userColumns = await Column.findAll({ where: { boardId: id } });
    res.json(userColumns);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const createColumn = async (req, res) => {
  try {
    let { title, boardId } = req.body;

    let column = await Column.create({ title, boardId });

    column = column.toJSON();
    res.json(column);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateColumn = async (req, res) => {
  try {
    const { id } = req.params;

    let { title, columnId } = req.body;

    if (id !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    if (!title) { return res.sendStatus(400); }

    let [, [updatedColumn]] = await Column.update(
      { title },
      {
        where: { id: columnId },
        returning: true, individualHooks: true
      }
    );

    updatedColumn = updatedColumn.toJSON();
    res.json(updatedColumn);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// async function deleteColumn(req, res) {
//   try {
//     const { id } = req.params;

//     await Column.destroy({ where: { id } });

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
  createColumn,
  getColumns,
  updateColumn,
  // deleteColumn,
};
