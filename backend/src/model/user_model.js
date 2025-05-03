const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  email: { type: DataTypes.STRING(255), allowNull: true},
  password: { type: DataTypes.STRING(255), allowNull: false },
  phone: { type: DataTypes.STRING(50), allowNull: true },
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
