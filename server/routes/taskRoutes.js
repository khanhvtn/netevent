const router = require('express').Router();
const { taskControllers } = require('../controllers');

/**
 *  =====================================
 *              TASK ROUTER
 *  =====================================
 */

// CRUD
router.post('/create', taskControllers.createTask);
router.get('/filter', taskControllers.filter);
router.get('/getTasksByEvent', taskControllers.getTasksByEvent);
router.patch('/update', taskControllers.updateTask);
router.delete('/delete', taskControllers.deleteTask);

module.exports = router;
