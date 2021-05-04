const router = require('express').Router();
const { userControllers } = require('../controllers');

router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);

router.route('/users')
    .get(userControllers.getUser)

router.route('/users/:id')
    .delete(userControllers.deleteUser)
    
module.exports = router;
