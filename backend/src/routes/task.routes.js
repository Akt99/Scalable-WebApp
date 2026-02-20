const express = require('express');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createTaskValidator,
  updateTaskValidator,
  taskIdParamValidator,
  listTasksValidator
} = require('../validators/task.validator');

const router = express.Router();

router.use(authMiddleware);
router.get('/', listTasksValidator, validate, taskController.listTasks);
router.post('/', createTaskValidator, validate, taskController.createTask);
router.get('/:id', taskIdParamValidator, validate, taskController.getTask);
router.patch('/:id', updateTaskValidator, validate, taskController.updateTask);
router.delete('/:id', taskIdParamValidator, validate, taskController.deleteTask);

module.exports = router;
