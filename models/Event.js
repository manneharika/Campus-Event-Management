const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Workshop', 'Fest', 'Seminar', 'Hackathon', 'Tech Talk'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  collegeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Colleges',
      key: 'id'
    }
  }
});

module.exports = Event;