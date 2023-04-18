const Sequelize = require('sequelize')
var pg = require('pg');
pg.defaults.ssl = true;

const sequelize = new Sequelize(
	'seatreservation',
	'seatreservation',
	'xD6o35DzPnfIAEnmdR8srDmgeGQe0psR', {
		dialect: 'postgres',	
		host: 'dpg-cgu9qaqut4mcfrhfn1gg-a.oregon-postgres.render.com'
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
