const router = require('express').Router();
const { authentication } = require('../middlewares');
const { facilityControllers } = require('../controllers');

router.post('/create', facilityControllers.createFacility);

module.exports = router;
