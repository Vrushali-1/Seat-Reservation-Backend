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

//const hostname = 'localhost';
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/',userRoutes);
app.use('/',busRoutes);
app.use('/',bookingRoutes);

sequelize.sync({alter:true})

app.get("/", (req,res)=> {
  res.send("Hello there! Bus api is working")
})


app.listen(port, () => {
  console.log(`Sever is running port ${port} ...`);
}); 


