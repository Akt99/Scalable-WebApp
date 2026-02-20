export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  return password.length >= 8 && hasUppercase && hasNumber;
};

export const validateTaskTitle = (title) => title.trim().length >= 3;
