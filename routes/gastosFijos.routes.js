const express = require('express');
const router = express.Router();
const { 
  crearGastoFijo, 
  obtenerGastosFijos,
  actualizarGastoFijo,
  eliminarGastoFijo
} = require('../controllers/gastosFijos.controller');
const autenticar = require('../middlewares/autenticacion');

// Aplicar middleware de autenticación a todas las rutas
router.use(autenticar);

// Rutas para Gastos Fijos
router.post('/', crearGastoFijo);
router.get('/', obtenerGastosFijos);
router.put('/:id', actualizarGastoFijo);
router.delete('/:id', eliminarGastoFijo);

module.exports = router;
