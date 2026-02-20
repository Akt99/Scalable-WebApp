const userService = require('../services/user.service');
const { sendSuccess } = require('../utils/response');

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfileByUserId(req.user.id);
    return sendSuccess(res, user, 'Profile fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfileByUserId(req.user.id, req.body);
    return sendSuccess(res, user, 'Profile updated successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};
