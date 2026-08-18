const { DataTypes: DataTypesAlert } = require('sequelize');
const sequelize = require('../config/db');

const Alert = sequelize.define('Alert', {
  alert_id: { 
    type: DataTypesAlert.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  device_id: { 
    type: DataTypesAlert.INTEGER, 
    allowNull: false,
    references: {
      model: 'devices',
      key: 'device_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  alert_type: { 
    type: DataTypesAlert.STRING(50), 
    allowNull: false 
  },
  value: { 
    type: DataTypesAlert.FLOAT, 
    allowNull: false 
  },
  alert_time: { 
    type: DataTypesAlert.DATE, 
    allowNull: false, 
    defaultValue: DataTypesAlert.NOW 
  },
  is_resolved: { 
    type: DataTypesAlert.BOOLEAN, 
    allowNull: false, 
    defaultValue: false 
  }
}, {
  tableName: 'alerts',
  timestamps: true
});

module.exports = Alert;
