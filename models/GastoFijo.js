const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GastoFijo = sequelize.define('GastoFijo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descripcion: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('Pagado', 'Pendiente'),
    allowNull: false,
    defaultValue: 'Pendiente'
  }
}, {
  tableName: 'gastos_fijos',
  timestamps: true,
  createdAt: 'fecha_creacion',
  updatedAt: 'fecha_actualizacion'
});

module.exports = GastoFijo;