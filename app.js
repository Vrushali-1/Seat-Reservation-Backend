// Import the sequelize object on which
// we have defined model.
const sequelize = require('./database')
	
// Import the user model we have defined
const User = require('./models/user')

const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer();

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

	
// Force sync all models
// It will drop the table first
// and re-create it afterwards
sequelize.sync({alter:true})
