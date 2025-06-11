const express = require('express');
const router = express.Router();
const gastosFijosController = require('../controllers/gastosFijos.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // Asegúrate de que esta ruta sea correcta

// Rutas protegidas
router.get('/', authMiddleware.verificarToken, gastosFijosController.obtenerGastosFijos);
router.post('/', authMiddleware.verificarToken, gastosFijosController.crearGastoFijo);
router.put('/:id', authMiddleware.verificarToken, gastosFijosController.actualizarGastoFijo);
router.delete('/:id', authMiddleware.verificarToken, gastosFijosController.eliminarGastoFijo);

module.exports = router;
