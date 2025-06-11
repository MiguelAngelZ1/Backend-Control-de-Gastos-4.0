const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.login = async (req, res) => {
  try {
    const { nombre } = req.body;
    
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El nombre es requerido' });
    }

    const [usuario, creado] = await Usuario.findOrCreate({
      where: { nombre: nombre.trim() }
    });

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre },
      process.env.JWT_SECRET || 'secreto_desarrollo',
      { expiresIn: '24h' }
    );

    res.json({ 
      id: usuario.id, 
      nombre: usuario.nombre,
      token,
      mensaje: creado ? 'Usuario creado correctamente' : 'Inicio de sesión exitoso'
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};