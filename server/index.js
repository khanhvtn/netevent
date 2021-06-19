const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const {
  userRoutes,
  linkRoutes,
  facilityRoutes,
  eventTypeRoutes,
  eventRoutes,
  taskRoutes,
  facilityHistoryRoutes,
  participantRoutes,
  notificationHistoryRoutes
} = require('./routes');
const cors = require('cors');
const { errorHandler } = require('./middlewares');
const cookieParser = require('cookie-parser');

/**
 *  =====================================
 *          NETEVENT APP SERVER
 *  =====================================
 */

//middlewares
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(
  cors({
    credentials: true,
    origin: process.env.DEFAULT_HOST || 'http://localhost:3000'
  })
);
app.use(cookieParser());

//routes

//test route
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'success' });
});
app.use('/api/user', userRoutes);
app.use('/api/facility', facilityRoutes);
app.use('/api/link', linkRoutes);
app.use('/api/eventType', eventTypeRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/facilityHistory', facilityHistoryRoutes);
app.use('/api/participant', participantRoutes);
app.use('/api/notificationHistory', notificationHistoryRoutes);

// Serve static access an production mode
if (process.env.NODE_ENV === 'production') {
  // Have Node serve the files for our built React app
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  // All other GET requests not handled before will return our React app
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

//error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
const MONGO_ATLAS = `mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/netEvent?authSource=admin&replicaSet=atlas-l3xb7s-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
const MONGO_URI =
  process.env.CONNECTION_URL_HOST || MONGO_ATLAS || `mongodb://localhost:27017`;
mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  (err) => {
    if (err) {
      return console.log(err);
    }
    console.log(`Connect to DB success`);
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  }
);

module.exports = app;
