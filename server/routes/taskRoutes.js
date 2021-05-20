const router = require('express').Router();
const { authentication } = require('../middlewares');
const { taskControllers } = require('../controllers');

router.post('/create', taskControllers.createTask);
router.get('/filter', taskControllers.filter);
router.get('/all', taskControllers.getAllTask);
router.patch('/update', taskControllers.updateTask);
router.delete('/delete', taskControllers.deleteTask);

module.exports = router;
