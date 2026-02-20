const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
