const User = require('../models/User.model');

const getProfileByUserId = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return user;
};

const updateProfileByUserId = async (userId, payload) => {
  const updates = {};

  if (payload.name !== undefined) {
    updates.name = payload.name;
  }

  if (payload.email !== undefined) {
    const normalizedEmail = payload.email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail, _id: { $ne: userId } });
    if (existingUser) {
      const error = new Error('Email already in use');
      error.statusCode = 409;
      throw error;
    }
    updates.email = normalizedEmail;
  }

  const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return user;
};

module.exports = {
  getProfileByUserId,
  updateProfileByUserId
};
