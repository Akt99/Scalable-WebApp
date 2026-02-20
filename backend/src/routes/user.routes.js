const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { updateProfileValidator } = require('../validators/user.validator');

const router = express.Router();

router.use(authMiddleware);
router.get('/me', userController.getProfile);
router.patch('/me', updateProfileValidator, validate, userController.updateProfile);

module.exports = router;
