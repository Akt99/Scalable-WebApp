const { verifyToken } = require('../utils/jwt');
const { sendError } = require('../utils/response');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'Unauthorized: missing token', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.userId,
      email: payload.email
    };
    return next();
  } catch (error) {
    return sendError(res, 'Unauthorized: invalid or expired token', 401);
  }
};

module.exports = authMiddleware;
