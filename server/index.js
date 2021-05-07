const express = require('express');
const mongoose = require('mongoose');
const app = express();
const { userRoutes, linkRoutes } = require('./routes');
const cors = require('cors');
const { errorHandler } = require('./middlewares');
const cookieParser = require('cookie-parser');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

//routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'success' });
});
app.use('/api/user', userRoutes);
app.use('/api/link', linkRoutes)

//error handler
app.use(errorHandler);

const port = process.env.PORT || 5000;
const MONGO_URI = `mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/netEvent?authSource=admin&replicaSet=atlas-l3xb7s-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;
// const MONGO_URI = `mongodb://localhost:27017`;
mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Connect to DB success`);
        app.listen(port, () =>
            console.log(`Server is running on port ${port}`)
        );
    }
);
