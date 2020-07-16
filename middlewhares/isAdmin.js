module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};
