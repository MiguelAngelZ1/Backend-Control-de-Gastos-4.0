const { GastoFijo } = require('../models');

exports.crearGastoFijo = async (req, res) => {
  try {
    const { descripcion, monto, estado } = req.body;
    const usuarioId = req.usuarioId; // Obtenido del middleware de autenticación

    const gasto = await GastoFijo.create({
      descripcion,
      monto,
      estado,
      usuario_id: usuarioId
    });

    res.status(201).json({
      mensaje: 'Gasto fijo creado correctamente',
      gasto
    });
  } catch (error) {
    console.error('Error al crear gasto fijo:', error);
    res.status(500).json({ error: 'Error al crear el gasto fijo' });
  }
};

exports.obtenerGastosFijos = async (req, res) => {
  try {
    const usuarioId = req.usuarioId;
    const gastos = await GastoFijo.findAll({
      where: { usuario_id: usuarioId },
      order: [['fecha_creacion', 'DESC']]
    });
    res.json(gastos);
  } catch (error) {
    console.error('Error al obtener gastos fijos:', error);
    res.status(500).json({ error: 'Error al obtener los gastos fijos' });
  }
};

exports.actualizarGastoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, monto, estado } = req.body;
    const usuarioId = req.usuarioId;

    const [actualizado] = await GastoFijo.update(
      { descripcion, monto, estado },
      { 
        where: { 
          id,
          usuario_id: usuarioId // Asegura que solo el dueño pueda actualizar
        } 
      }
    );

    if (actualizado) {
      res.json({ mensaje: 'Gasto fijo actualizado correctamente' });
    } else {
      res.status(404).json({ error: 'Gasto fijo no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar gasto fijo:', error);
    res.status(500).json({ error: 'Error al actualizar el gasto fijo' });
  }
};

exports.eliminarGastoFijo = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuarioId;

    const eliminado = await GastoFijo.destroy({
      where: { 
        id,
        usuario_id: usuarioId // Asegura que solo el dueño pueda eliminar
      }
    });

    if (eliminado) {
      res.json({ mensaje: 'Gasto fijo eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Gasto fijo no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar gasto fijo:', error);
    res.status(500).json({ error: 'Error al eliminar el gasto fijo' });
  }
};