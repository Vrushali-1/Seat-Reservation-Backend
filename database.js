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


module.exports = sequelize
