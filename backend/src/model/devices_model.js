
const { DataTypes: DataTypesDevice } = require('sequelize');
const sequelize = require('../config/db');

const Device = sequelize.define('Device', {
  device_id: { 
    type: DataTypesDevice.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  zone_id: { 
    type: DataTypesDevice.INTEGER, 
    allowNull: false,
    references: {
      model: 'zones',   // Tên bảng khoá ngoại
      key: 'zone_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  name: { 
    type: DataTypesDevice.STRING(100), 
    allowNull: false 
  },
  device_type: { 
    type: DataTypesDevice.STRING(50), 
    allowNull: false 
  },
  status: { 
    type: DataTypesDevice.STRING(20), 
    allowNull: true 
  },
}, {
  tableName: 'devices',
  timestamps: true
  // 👉 Không có "indexes" nữa
});

module.exports = Device;
