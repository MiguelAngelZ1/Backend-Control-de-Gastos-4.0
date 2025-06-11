require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, setupRelations } = require('./models');
const authRoutes = require('./routes/auth.routes');
const gastosFijosRoutes = require('./routes/gastosFijos.routes');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5500',        // Desarrollo local
    'http://127.0.0.1:5500',       // Alternativa local
    'https://tudominio.com',        // Tu dominio personalizado
    'https://github.com/MiguelAngelZ1/Backend-Control-de-Gastos-4.0.git',  // GitHub Pages
    'https://control-gastos-backend-q2el.onrender.com'    // URL de Render
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de cabeceras
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Rutas públicas
app.get('/api/status', (req, res) => {
  res.json({ status: 'API funcionando correctamente' });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Middleware de autenticación para rutas protegidas
app.use(authMiddleware.verificarToken);

// Rutas protegidas
app.use('/api/gastos-fijos', gastosFijosRoutes);

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Ruta para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Sincronizar modelos y arrancar el servidor
const iniciarServidor = async () => {
  try {
    // Inicializar relaciones
    setupRelations();
    
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');

    // Sincronizar modelos (force: false para no borrar datos)
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados correctamente.');

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
      console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejar cierre del proceso
process.on('SIGINT', async () => {
  try {
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
    process.exit(0);
  } catch (error) {
    console.error('Error al cerrar la conexión a la base de datos:', error);
    process.exit(1);
  }
});

// Iniciar la aplicación
iniciarServidor().catch(error => {
  console.error('Error al iniciar la aplicación:', error);
  process.exit(1);
});
