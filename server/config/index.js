const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    //env configs
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    ENVIRONMENT: process.env.ENVIRONMENT,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,

    //nonenv configs
    SEARCH_RADIUS: 100,
    EXPIRY_TIME: 100 * 24 * 60 * 60,
    OPT_EXPIRY_TIME: 10 * 60 * 1000   //in milliseconds
};