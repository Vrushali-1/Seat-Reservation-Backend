// Import the sequelize object on which
// we have defined model.
const sequelize = require('./sqldatabase');
const booking = require('./models/booking');
const student = require('./models/student');
const bus = require('./models/bus');
const seat = require('./models/seat');
const bus_seat = require('./models/bus-seat');
const express = require('express');
const routes = require('./routes/userRoutes');
const app = express();
const mongoose = require('./nosqldatabase');

const hostname = 'localhost';
const port = 3000;

app.use(express.json());
app.use('/',routes);

sequelize.sync({alter:true})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


