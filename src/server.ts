import app from './app';
import prisma from './prisma/client';

const PORT = process.env.PORT || 7070;

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejar cierre de la aplicación
process.on('SIGTERM', () => {
    console.log('Cerrando servidor...');
    server.close(async () => {
      await prisma.$disconnect();
      console.log('Servidor cerrado.');
    });
  });