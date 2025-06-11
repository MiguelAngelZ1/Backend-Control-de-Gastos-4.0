const Usuario = require('./Usuario');
const GastoFijo = require('./GastoFijo');

// Relaciones
Usuario.hasMany(GastoFijo, { foreignKey: 'usuario_id' });
GastoFijo.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = {
  Usuario,
  GastoFijo
};