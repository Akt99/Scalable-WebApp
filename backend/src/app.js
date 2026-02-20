const express = require('express');
const cors = require('cors');
const env = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');
const { errorMiddleware, notFoundMiddleware } = require('./middleware/error.middleware');

const app = express();

app.use(
  cors({
    origin: env.corsOrigin === '*' ? true : env.corsOrigin.split(','),
    credentials: true
  })
);
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
