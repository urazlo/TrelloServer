module.exports = (err) => {
  if (err.message.includes('unique')) {

    if (err.message.includes('Login')) { return 'This login is already exists'; }

    return 'This email is already exists';
  }
  if (err.message.includes('than') || err.message.includes('valid')) {

    if (err.message.includes('login')) { return 'Invalid login'; }

    return 'Invalid email';
  }

  return '';
};
