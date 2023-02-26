require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const connectDB = require('../config/dbConnection');
const corsOptions = require('../config/corsOptions');
const checkOrigins = require('../middleware/checkOrigins');
const v1PastPaperRoutes = require('../v1/routes/pastPaperRoutes');

// Connect to MongoDB
connectDB();

// body parser configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(checkOrigins);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware for json 
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Hello test")
})

// health check end point
app.get('/health', (req, res) => {
    res.json({ status: 'API is healthy' });
});

// image upload url
app.use('/public/images', express.static('public/images'));

//Api access end points
app.use('/api/v1/past_papers', v1PastPaperRoutes);

let PORT;

// Check environment
if (process.env.NODE_ENV === 'development') {
    PORT = process.env.DEV_PORT
}

if (process.env.NODE_ENV === 'production') {
    PORT = process.env.PROD_PORT
}

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on ${PORT} ...`));
});