const { body, param, query } = require('express-validator');

const createTaskValidator = [
  body('title').trim().isLength({ min: 3, max: 120 }).withMessage('Title must be 3-120 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in_progress', 'done'])
    .withMessage('Status must be todo, in_progress, or done'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date').toDate()
];

const updateTaskValidator = [
  param('id').isMongoId().withMessage('Invalid task id'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage('Title must be 3-120 characters long'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('status')
    .optional()
    .isIn(['todo', 'in_progress', 'done'])
    .withMessage('Status must be todo, in_progress, or done'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('Due date must be a valid date').toDate()
];

const taskIdParamValidator = [param('id').isMongoId().withMessage('Invalid task id')];

const listTasksValidator = [
  query('status').optional().isIn(['todo', 'in_progress', 'done']).withMessage('Invalid status filter'),
  query('q').optional().trim().isLength({ max: 120 }).withMessage('Search query cannot exceed 120 characters'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer').toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1-100').toInt()
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  taskIdParamValidator,
  listTasksValidator
};
