const { DataTypes } = require('sequelize');
const sequelize = require('../sqldatabase');

const Bus = sequelize.define('Bus', {
    bus_id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    departure: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    travel_date: {
        type: DataTypes.DATE,
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

// Define a beforeCreate hook to generate the bus_id value dynamically
Bus.beforeCreate((bus, options) => {
    return Bus.max('bus_id').then(maxId => {
        bus.bus_id = (maxId || 0) + 1;
        return bus;
    });
});

module.exports = Bus;
  
