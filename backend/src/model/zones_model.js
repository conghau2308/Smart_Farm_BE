const { DataTypes: DataTypesZone } = require('sequelize');
const sequelize = require('../config/db');

const Zone = sequelize.define('Zone', {
  zone_id: { type: DataTypesZone.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypesZone.STRING(50), allowNull: false },
  description: { type: DataTypesZone.TEXT, allowNull: true }
}, {
  tableName: 'zones',
  timestamps: true
});

module.exports = Zone;