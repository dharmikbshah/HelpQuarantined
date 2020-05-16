const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors');
const mongoose = require('mongoose');
const configRoutes = require("./routes");
const config = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api', (req, res) => res.status(200).send('API works.'));

configRoutes(app);

app.on('uncaughtException', (err) => {
  console.error(colors.red(err.stack));
  process.exit(2);
});

async function initServer() {
  app.config = config;
  try {
    console.log("Connecting to database");
    //database connection code
    await mongoose.connect(app.config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Successfully connected to the database");

    console.log("Starting App server");
    //Start the app
    await app.listen(app.config.PORT);
    app.emit('appStarted');
    console.log(colors.green('Server is running on host: http://localhost:' + app.config.PORT));

  } catch (err) {
    console.error(colors.red('Error starting Server app:' + err));
    process.exit(2);
  }
}

initServer()

module.exports = app;