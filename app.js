// Import the sequelize object on which
// we have defined model.
const sequelize = require('./sqldatabase')
const express = require('express');
const routes = require('./routes/userRoutes');
const app = express();
const mongoose = require('./nosqldatabase')
const initSequence = require('./initSequence');
initSequence();

const hostname = 'localhost';
const port = 3000;

app.use(express.json());
app.use('/',routes);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

sequelize.sync({alter:true})

