const { DataTypes } = require('sequelize');
const sequelize = require('../sqldatabase');
const Student = require('../models/student');
const Bus = require('../models/bus');
const Seat = require('../models/seat');

const Bus_Seat = sequelize.define('Bus_Seat', {
    bus_seat_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
Bus_Seat.belongsTo(Student, { foreignKey: 'student_id' });
Bus_Seat.belongsTo(Bus, { foreignKey: 'bus_id' });
Bus_Seat.belongsTo(Seat, { foreignKey: 'seat_id' });


module.exports = Bus_Seat;