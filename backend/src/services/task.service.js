const Task = require('../models/Task.model');

const createTaskForUser = async (userId, payload) => {
  const task = await Task.create({
    userId,
    title: payload.title,
    description: payload.description || '',
    status: payload.status || 'todo',
    dueDate: payload.dueDate || null
  });

  return task;
};

const listTasksForUser = async (userId, query) => {
  const filter = { userId };
  const page = query.page || 1;
  const limit = query.limit || 10;

  if (query.status) {
    filter.status = query.status;
  }

  if (query.q) {
    filter.$or = [
      { title: { $regex: query.q, $options: 'i' } },
      { description: { $regex: query.q, $options: 'i' } }
    ];
  }

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Task.countDocuments(filter)
  ]);

  return {
    items: tasks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    }
  };
};

const getTaskByIdForUser = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const updateTaskForUser = async (userId, taskId, payload) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, payload, {
    new: true,
    runValidators: true
  });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const deleteTaskForUser = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

module.exports = {
  createTaskForUser,
  listTasksForUser,
  getTaskByIdForUser,
  updateTaskForUser,
  deleteTaskForUser
};
