const { DataTypes } = require('sequelize');
const sequelize = require('../sqldatabase');
const Student = require('../models/student');
const Bus = require('../models/bus');


const Booking = sequelize.define('Booking', {
    booking_id: {
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
Booking.belongsTo(Student, { foreignKey: 'student_id' });
Booking.belongsTo(Bus, { foreignKey: 'bus_id' });


module.exports = Booking;
  
