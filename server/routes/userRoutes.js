const router = require('express').Router();
const { userControllers } = require('../controllers');
const { authentication } = require('../middlewares');

/**
 *  =====================================
 *             USER ROUTER
 *  =====================================
 */

// AUTH
router.post('/login', userControllers.login);
router.post('/fetchCurrent', userControllers.fetchCurrentUser);
router.get('/userCheck', authentication, userControllers.userCheck);
router.get('/logout', userControllers.logout);

// CRUD
router.post('/create', userControllers.createUser);
router.get('/filter', userControllers.filterUser);
router.patch('/update', userControllers.updateUser);
router.delete('/delete',userControllers.deleteUser);

module.exports = router;
