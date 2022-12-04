require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require('../config/dbConnection');
const corsOptions = require('../config/corsOptions');
const checkOrigins = require('../middleware/checkOrigins');

// Connect to MongoDB
connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(checkOrigins);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// middleware for json 
app.use(express.json());

let PORT;

// Check environment
if (process.env.NODE_ENV === 'development') {
    PORT = process.env.PROD_DEV
}

if (process.env.NODE_ENV === 'production') {
    PORT = process.env.PROD_PORT
}

mongoose.connection.once('open', () => {
    console.log('Connected to DB');
    app.listen(PORT, () => console.log(`Server running on ${PORT} ...`));
});