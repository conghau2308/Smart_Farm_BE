const { DataTypes: DataTypesThreshold } = require('sequelize');
const sequelize = require('../config/db');

const DeviceThreshold = sequelize.define('DeviceThreshold', {
  threshold_id: { 
    type: DataTypesThreshold.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  device_id: { 
    type: DataTypesThreshold.INTEGER, 
    allowNull: false,
    references: {
      model: 'devices',
      key: 'device_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  parameter: { 
    type: DataTypesThreshold.STRING(50), 
    allowNull: false 
  },
  min_value: { 
    type: DataTypesThreshold.FLOAT, 
    allowNull: true 
  },
  max_value: { 
    type: DataTypesThreshold.FLOAT, 
    allowNull: true 
  },
  created_by: { 
    type: DataTypesThreshold.INTEGER, 
    allowNull: true,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  },
}, {
  tableName: 'device_thresholds',
  timestamps: true
});

module.exports = DeviceThreshold;
