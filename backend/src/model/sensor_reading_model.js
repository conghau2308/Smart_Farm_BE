const { DataTypes: DataTypesReading } = require('sequelize');
const sequelize = require('../config/db');

const SensorReading = sequelize.define('SensorReading', {
  reading_id: { 
    type: DataTypesReading.BIGINT, 
    primaryKey: true, 
    autoIncrement: true 
  },
  device_id: { 
    type: DataTypesReading.INTEGER, 
    allowNull: false,
    references: {
      model: 'devices',     // bảng devices
      key: 'device_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  data_type: { 
    type: DataTypesReading.STRING(50), 
    allowNull: false 
  },
  value: { 
    type: DataTypesReading.FLOAT, 
    allowNull: false 
  },
}, {
  tableName: 'sensor_readings',
  timestamps: true
});

module.exports = SensorReading;
