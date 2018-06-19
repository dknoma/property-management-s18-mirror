import validator from 'validator';

export function validateInput(data) {
  let errors = {};
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  console.log('data.password', data.password);
  if (validator.isEmpty(data.firstname)) errors.firstname = 'This field is required!';
  if (validator.isEmpty(data.lastname)) errors.lastname = 'This field is required!';
  if (validator.isEmpty(data.email)) errors.email = 'This field is required!';
  if (!validator.isEmail(data.email)) errors.email = 'Email is invalid!';
  if (!re.test(data.password)) errors.password = 'Password should be at least six characters, include at least one letter and one number!';
  if (validator.isEmpty(data.password)) errors.password = 'This field is required!';
  if (validator.isEmpty(data.passwordConfirm)) errors.passwordConfirm = 'This field is required!';
  if (!validator.equals(data.password, data.passwordConfirm)) errors.passwordConfirm = 'Password must match!';
  return errors;
}
