const Sequelize = require('sequelize')
var pg = require('pg');
pg.defaults.ssl = true;

const sequelize = new Sequelize(
	'seat reservation',
	'Vrushali',
	'UMBC@12345678', {
		dialect: 'postgres',	
		host: 'seat-reservation.postgres.database.azure.com'
	}
);

(async () => {
	console.log('inside the postgres sql connection database');
	try {
		console.log('inside the try block');
	  await sequelize.authenticate();
	  console.log('Connection has been established successfully.');
	} catch (error) {
	  console.error('Unable to connect to the database:', error);
	}
})();




module.exports = sequelize
