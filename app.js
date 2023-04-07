// Import the sequelize object on which
// we have defined model.
require('dotenv').config(); // loads environment variables from .env file
const sequelize = require('./sqldatabase');
const booking = require('./models/booking');
const student = require('./models/student');
const bus = require('./models/bus');
const seat = require('./models/seat');
const bus_seat = require('./models/bus-seat');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const app = express();
const mongoose = require('./nosqldatabase');
const cors = require('cors');

const hostname = 'localhost';
const port = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use('/',userRoutes);
app.use('/',busRoutes);
app.use('/',bookingRoutes);

sequelize.sync({alter:true})

app.listen(port, hostname, () => {
  console.log(`The Server running at http://${hostname}:${port}/`);
});


