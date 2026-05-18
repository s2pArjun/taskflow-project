const Task = require('../../models/task.model');

const getAllTasks = async (userId) => {
  return Task.findAll({ where: { user_id: userId }, order: [['createdAt', 'DESC']] });
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({ where: { id, user_id: userId } });
  if (!task) {
    const err = new Error('Task not found.');
    err.statusCode = 404;
    throw err;
  }
  return task;
};

const createTask = async (userId, body) => {
  return Task.create({ ...body, user_id: userId });
};

const updateTask = async (id, userId, body) => {
  const task = await getTaskById(id, userId); // throws 404 if not owned
  await task.update(body);
  return task;
};

const deleteTask = async (id, userId) => {
  const task = await getTaskById(id, userId);
  await task.destroy();
};

// Admin: get all tasks from all users
const getAllTasksAdmin = async () => {
  return Task.findAll({ order: [['createdAt', 'DESC']] });
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask, getAllTasksAdmin };
