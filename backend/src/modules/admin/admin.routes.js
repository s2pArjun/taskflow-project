const express = require('express');
const router = express.Router();
const User = require('../../models/user.model');
const Task = require('../../models/task.model');
const { authenticate } = require('../../middleware/auth.middleware');
const { requireRole } = require('../../middleware/role.middleware');
const { sendResponse, sendError } = require('../../utils/apiResponse');

// All admin routes require auth + admin role
router.use(authenticate, requireRole('admin'));

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only operations
 */

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All users
 *       403:
 *         description: Forbidden
 */
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [['createdAt', 'DESC']] });
    return sendResponse(res, { message: 'All users fetched.', data: { users } });
  } catch (err) { next(err); }
});

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return sendError(res, { statusCode: 404, message: 'User not found.' });
    if (user.id === req.user.id) return sendError(res, { statusCode: 400, message: 'Cannot delete yourself.' });
    await user.destroy();
    return sendResponse(res, { message: 'User deleted.', data: null });
  } catch (err) { next(err); }
});

/**
 * @swagger
 * /admin/tasks:
 *   get:
 *     summary: List all tasks from all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All tasks
 */
router.get('/tasks', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ order: [['createdAt', 'DESC']] });
    return sendResponse(res, { message: 'All tasks fetched.', data: { tasks } });
  } catch (err) { next(err); }
});

module.exports = router;
