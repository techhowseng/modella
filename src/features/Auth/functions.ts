// confirm password and confirmPassword match
export const confirmPasswordMatch = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

// validate email
export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
