const router = require('express').Router();
const { userControllers } = require('../controllers');

/**
 *  =====================================
 *             USER ROUTER
 *  =====================================
 */

// AUTH
router.post('/login', userControllers.login);
router.post('/fetchCurrent', userControllers.fetchCurrentUser);
router.get('/userCheck', userControllers.userCheck);
router.get('/logout', userControllers.logout);

// CRUD
router.post('/create', userControllers.createUser);
router.get('/filter', userControllers.filterUser);
router.get('/all', userControllers.getAllUser);
router.patch('/update', userControllers.updateUser);
router.delete('/delete', userControllers.deleteUser);

module.exports = router;
