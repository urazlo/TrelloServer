const errorHandler = (err) => {
  if (err.message.includes('duplicate key')) {
    if (err.message.includes('login')) {
      return 'This login is already exists';
    }
    return 'This email is already exists';
  } if (err.message.includes('than') || err.message.includes('valid')) {
    if (err.message.includes('login')) {
      return 'Invalid login';
    }
    return 'Invalid email';
  } if (err.message.includes('Cast to ObjectId failed for value')) {
    return 'Invalid ID';
  }
  return '';
};

module.exports = errorHandler;
