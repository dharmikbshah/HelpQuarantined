const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  //env configs
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  ENVIRONMENT: process.env.ENVIRONMENT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

  //nonenv configs
  SEARCH_RADIUS: 500,
  EXPIRY_TIME: 100 * 24 * 60 * 60,
  OPT_EXPIRY_TIME: 10 * 60 * 1000   //in milliseconds
};