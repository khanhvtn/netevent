const router = require('express').Router();
const { userControllers } = require('../controllers');

router.post('/create', userControllers.createUser);
router.post('/login', userControllers.login);
router.post('/search', userControllers.searchUser)

module.exports = router;
