const express = require('express');
const mongoose = require('mongoose');

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'success' });
});

const port = process.env.PORT || 5000;
const MONGO_URI = `mongodb+srv://khanhvtn93:khanhvtn93123@cluster0.zjom9.mongodb.net/netEvent?authSource=admin&replicaSet=atlas-l3xb7s-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`;

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Connect to DB success.`);
        app.listen(port, () => console.log(`Server is running on port${port}`));
    }
);
