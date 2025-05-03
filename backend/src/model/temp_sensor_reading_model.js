// Tạo bảng tạm để lưu trữ các giá trị mới nhất
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TempSensorReading = sequelize.define('TempSensorReading', {
  device_id: { 
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'devices',     
      key: 'device_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  data_type: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  value: { 
    type: DataTypes.FLOAT, 
    allowNull: false 
  },
}, {
  tableName: 'temp_sensor_readings',  // Tên bảng tạm
  timestamps: true
});

module.exports = TempSensorReading;
