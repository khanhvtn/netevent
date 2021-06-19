const router = require('express').Router();
const { linkControllers } = require('../controllers');

/**
 *  =====================================
 *             LINK ROUTER
 *  =====================================
 */

router.get('/', linkControllers.getLinks);
router.get('/:id', linkControllers.getLink);
router.patch('/confirm/:id', linkControllers.confirmPassword);
router.delete('/:id', linkControllers.deleteLink);

module.exports = router;
