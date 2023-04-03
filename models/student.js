const { DataTypes } = require('sequelize');
const sequelize = require('../sqldatabase');

const  Student = sequelize.define('Student', {
    student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
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

module.exports = Student;

