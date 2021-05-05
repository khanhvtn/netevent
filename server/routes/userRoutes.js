const router = require('express').Router();
const { userControllers } = require('../controllers');

router.get('/', userControllers.getUsers);
router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);
router.delete('/:id', userControllers.deleteUser)
module.exports = router;
