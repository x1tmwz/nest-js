function validatePassword(password = '') {
  if (!password || (password && password.length < 8)) {
    console.log(false);
  }
  const checkUpperCaseRegEx = password.match(/[A-Z]/);
  const atLeastOneDigit = password.match(/\d/);
  const atLeastNonAlphanumericChar = password.match(/[\W_]/);
  console.log(checkUpperCaseRegEx);
  console.log(atLeastOneDigit);
  console.log(atLeastNonAlphanumericChar);22
}

validatePassword("1953752M")
