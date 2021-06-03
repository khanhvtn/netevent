const router = require('express').Router();
const { authentication } = require('../middlewares');
const { facilityControllers } = require('../controllers');

/**
 *  =====================================
 *            FACILITY ROUTER
 *  =====================================
 */

// CRUD
router.post('/create', facilityControllers.createFacility);
router.get('/filter', facilityControllers.filter);
router.get('/all', facilityControllers.getAllFacility);
router.patch('/update', facilityControllers.updateFacility);
router.delete('/delete', facilityControllers.deleteFacility);
router.delete('/deleteP', facilityControllers.deleteFacilityPermanent);
router.patch('/recovery', facilityControllers.recoveryFacility);

module.exports = router;
