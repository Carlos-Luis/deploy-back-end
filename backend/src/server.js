import 'dotenv/config';        // Carga variables de entorno desde .env
import app from './app.js';    // Importa la configuración de Express
import { connectDB } from './config/db.js'; // Función para conectar a MongoDB

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos y arranque del servidor
(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('✅ Conexión a MongoDB exitosa');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
})();