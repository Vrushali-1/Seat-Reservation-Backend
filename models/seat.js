const { DataTypes } = require('sequelize');
const sequelize = require('../sqldatabase');

const Seat = sequelize.define('Seat', {
    seat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    seat_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Seat;
  
