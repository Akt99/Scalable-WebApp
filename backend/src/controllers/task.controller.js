const taskService = require('../services/task.service');
const { sendSuccess } = require('../utils/response');

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTaskForUser(req.user.id, req.body);
    return sendSuccess(res, task, 'Task created successfully', 201);
  } catch (error) {
    return next(error);
  }
};

const listTasks = async (req, res, next) => {
  try {
    const result = await taskService.listTasksForUser(req.user.id, req.query);
    return sendSuccess(res, result, 'Tasks fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskByIdForUser(req.user.id, req.params.id);
    return sendSuccess(res, task, 'Task fetched successfully');
  } catch (error) {
    return next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTaskForUser(req.user.id, req.params.id, req.body);
    return sendSuccess(res, task, 'Task updated successfully');
  } catch (error) {
    return next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTaskForUser(req.user.id, req.params.id);
    return sendSuccess(res, null, 'Task deleted successfully');
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
};
