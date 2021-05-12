const router = require('express').Router();
const { authentication } = require('../middlewares');
const { facilityControllers } = require('../controllers');

router.post('/create', facilityControllers.createFacility);
router.get('/filter', facilityControllers.filter);
router.patch('/update', facilityControllers.updateFacility);
router.delete('/delete', facilityControllers.deleteFacilities);

module.exports = router;
