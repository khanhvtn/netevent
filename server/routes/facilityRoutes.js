const router = require('express').Router();
const { facilityControllers } = require('../controllers');
const { authentication } = require('../middlewares');


// router.get('/', userControllers.getUsers);
router.get('/', facilityControllers.getFacilities)
router.post('/', facilityControllers.createFacility);
router.delete('/:id', facilityControllers.deleteFacility)
router.patch('/:id', facilityControllers.updateFacility)
router.post('/search', facilityControllers.searchFacility)

module.exports = router;
