const env = require('./config/env');
const connectDb = require('./config/db');
const app = require('./app');
const logger = require('./utils/logger');

const startServer = async () => {
  await connectDb();
  app.listen(env.port, () => {
    logger.info(`Backend listening on port ${env.port}`);
  });
};

startServer();
