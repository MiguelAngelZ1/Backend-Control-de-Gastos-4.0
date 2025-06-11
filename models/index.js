const Usuario = require('./Usuario');
const GastoFijo = require('./GastoFijo');
const sequelize = require('../config/database');

// Configura las relaciones
function setupRelations() {
  Usuario.hasMany(GastoFijo, { foreignKey: 'usuario_id' });
  GastoFijo.belongsTo(Usuario, { foreignKey: 'usuario_id' });
}

module.exports = {
  Usuario,
  GastoFijo,
  setupRelations,
  sequelize
};
