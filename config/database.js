const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuración de Sequelize
const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
);

module.exports = sequelize;
