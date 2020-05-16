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
};