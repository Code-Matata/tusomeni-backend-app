require('dotenv').config();

const allowedOrigins = [
    process.env.DEV_APP_URL,
    process.env.PROD_APP_URL,
];

module.exports = allowedOrigins;