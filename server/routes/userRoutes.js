const router = require('express').Router();
const { userControllers } = require('../controllers');
const { authentication } = require('../middlewares');

router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);
router.get('/userCheck', authentication, userControllers.userCheck);

module.exports = router;
