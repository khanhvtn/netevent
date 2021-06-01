//import route here
const userRoutes = require('./userRoutes');
const facilityRoutes = require('./facilityRoutes');
const linkRoutes = require('./linkRoutes');
const eventTypeRoutes = require('./eventTypeRoutes');
const eventRoutes = require('./eventRoutes');
const taskRoutes = require('./taskRoutes');
const facilityHistoryRoutes = require('./facilityHistoryRoutes');

/**
 *  =====================================
 *          ALL ROUTES EXPORT
 *  =====================================
 */

module.exports = {
    //add routes here
    userRoutes,
    facilityRoutes,
    linkRoutes,
    eventTypeRoutes,
    eventRoutes,
    taskRoutes,
    facilityHistoryRoutes,
};
