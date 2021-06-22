const router = require('express').Router();
const { facilityHistoryControllers } = require('../controllers');

/**
 *  =====================================
 *        FACILITY HISTORY ROUTER
 *  =====================================
 */

// CRUD
router.post('/create', facilityHistoryControllers.createFacilityHistory);
router.get('/filter', facilityHistoryControllers.filter);
router.get('/all', facilityHistoryControllers.getAllFacilityHistory);
router.patch('/update', facilityHistoryControllers.updateFacilityHistory);
router.delete('/delete', facilityHistoryControllers.deleteFacilityHistory);
router.delete('/:id', facilityHistoryControllers.deleteEachFacilityHistory);

module.exports = router;
