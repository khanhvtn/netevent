const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
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
    notificationHistoryRoutes,
    feedbackRoutes
} = require('./routes');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares');

/**
 *  =====================================
 *          NETEVENT APP SERVER
 *  =====================================
 */

//connect to mongodb
const port = process.env.PORT || 5000;
const MONGO_URI =
    process.env.CONNECTION_URL_HOST || `mongodb://localhost:27017`;

const dbConnection = mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((m) => {
        console.log(`Connect to DB success`);
        return m.connection.getClient();
    });

//middlewares
app.use(express.json({ limit: '30mb' }));
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(
    cors({
        credentials: true,
        origin: process.env.DEFAULT_HOST || 'http://localhost:3000'
    })
);

let defaultSessionOptions = {
    name: process.env.SESS_NAME,
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        clientPromise: dbConnection,
        ttl: parseInt(process.env.SESS_LIFETIME) * 24 * 60 * 60 // (24 * 60 * 60) = 1 day
    }),
    cookie: {
        httpOnly: true,
        maxAge: parseInt(process.env.SESS_LIFETIME) * 24 * 60 * 60 * 1000 // (24 * 60 * 60 * 1000) = 24h
    }
};

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    defaultSessionOptions.cookie.secure = true; // serve secure cookies
}
//config session
app.use(session(defaultSessionOptions));

//routes
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
app.use('/api/feedback', feedbackRoutes);

// Serve static access an production mode
if (process.env.NODE_ENV === 'production') {
    // Have Node serve the files for our built React app
    app.use(express.static(path.resolve(__dirname, '../client/build')));

    // All other GET requests not handled before will return our React app
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
}

//use error handler
app.use(errorHandler);
dbConnection
    .then(() =>
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    )
    .catch((err) => console.error('Error connecting to db:', err));
module.exports = app;
