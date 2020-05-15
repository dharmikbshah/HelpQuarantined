const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    //env configs
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    ENVIRONMENT: process.env.ENVIRONMENT,

    //nonenv configs
};