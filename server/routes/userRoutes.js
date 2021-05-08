const router = require('express').Router();
const { userControllers } = require('../controllers');
const { authentication } = require('../middlewares');

// router.get('/', userControllers.getUsers);
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);
router.get('/userCheck', authentication, userControllers.userCheck);
// router.delete('/:id', userControllers.deleteUser)
router.post('/search', userControllers.searchUser)

router.route('/users').get(userControllers.getUser)

router.route('/users/:id').delete(userControllers.deleteUser)
    
module.exports = router;
