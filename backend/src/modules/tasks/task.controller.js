const taskService = require('./task.service');
const { sendResponse } = require('../../utils/apiResponse');

const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(req.user.id);
    return sendResponse(res, { message: 'Tasks fetched.', data: { tasks } });
  } catch (err) { next(err); }
};

const getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    return sendResponse(res, { message: 'Task fetched.', data: { task } });
  } catch (err) { next(err); }
};

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    return sendResponse(res, { statusCode: 201, message: 'Task created.', data: { task } });
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.user.id, req.body);
    return sendResponse(res, { message: 'Task updated.', data: { task } });
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.user.id);
    return sendResponse(res, { message: 'Task deleted.', data: null });
  } catch (err) { next(err); }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };
