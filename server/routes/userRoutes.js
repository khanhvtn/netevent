const router = require('express').Router();
const { userControllers } = require('../controllers');
const { authentication } = require('../middlewares');

// router.get('/', userControllers.getUsers);
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);
router.get('/userCheck', authentication, userControllers.userCheck);
router.get('/logout', authentication, userControllers.logout);
// router.delete('/:id', userControllers.deleteUser)
router.post('/search', userControllers.searchUser)

router.get('/', userControllers.getUser)
router.patch('/:id', userControllers.updateUser)

router.route('/users/:id').delete(userControllers.deleteUser)

module.exports = router;
