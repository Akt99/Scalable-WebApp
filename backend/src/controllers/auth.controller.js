const authService = require('../services/auth.service');
const { sendSuccess } = require('../utils/response');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return sendSuccess(res, result, 'User registered successfully', 201);
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return sendSuccess(res, result, 'Login successful', 200);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login
};
