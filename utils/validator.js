const passwordValidation = (password) => {
  if (
    password.length < 6 ||
    password.length > 40 ||
    !/^[a-z0-9]*$/i.test(password)
  ) {
    return false;
  }
  return true;
};

module.exports = {
  password: passwordValidation,
};
