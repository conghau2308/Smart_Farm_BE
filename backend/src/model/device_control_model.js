const { DataTypes: DataTypesControl } = require('sequelize');
const sequelize = require('../config/db');

const DeviceControl = sequelize.define('DeviceControl', {
  control_id: { 
    type: DataTypesControl.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  device_id: { 
    type: DataTypesControl.INTEGER, 
    allowNull: false,
    references: {
      model: 'devices',
      key: 'device_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  mode: { 
    type: DataTypesControl.STRING(10), 
    allowNull: false 
  },
  status: { 
    type: DataTypesControl.STRING(20), 
    allowNull: true 
  },
  updated_by: { 
    type: DataTypesControl.INTEGER, 
    allowNull: true,
    references: {
      model: 'users',
      key: 'user_id'
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'device_controls',
  timestamps: true
});

module.exports = DeviceControl;
