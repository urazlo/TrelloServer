const { Card } = require('../models');

async function getCards(req, res) {
  try {
    const userCards = await Card.findAll();
    res.json(userCards);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

const createCard = async (req, res) => {
  try {
    let { cardInputValue, columnId } = req.body;
    let card = await Card.create({ title: cardInputValue, columnId });

    card = card.toJSON();
    res.json(card);
  }
  catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
};

const updateCard = async (req, res) => {
  try {
    const { id } = req.params;

    let { title, cardId } = req.body;

    if (id !== req.user.id.toString() && req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    if (!title) { return res.sendStatus(400); }

    let [, [updatedCard]] = await Card.update(
      { title },
      {
        where: { id: cardId },
        returning: true, individualHooks: true
      }
    );

    updatedCard = updatedCard.toJSON();
    res.json(updatedCard);
  }
  catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

// async function deleteCard(req, res) {
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
  createCard,
  getCards,
  updateCard,
  // deleteCard,
};
