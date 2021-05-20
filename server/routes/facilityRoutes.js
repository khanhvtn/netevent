const router = require('express').Router();
const { authentication } = require('../middlewares');
const { facilityControllers } = require('../controllers');

router.post('/create', facilityControllers.createFacility);
router.get('/filter', facilityControllers.filter);
router.get('/all', facilityControllers.getAllFacility);
router.patch('/update', facilityControllers.updateFacility);
router.delete('/delete', facilityControllers.deleteFacility);

module.exports = router;
