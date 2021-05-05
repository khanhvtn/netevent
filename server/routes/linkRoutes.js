const router = require('express').Router();
const linkControllers  = require('../controllers/linkController');

router.get('/', linkControllers.getLinks);
router.get('/:id', linkControllers.getLink);
router.delete('/:id', linkControllers.deleteLink);


module.exports = router;
