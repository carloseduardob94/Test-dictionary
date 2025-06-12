import { app } from './app';
import { connectDatabase } from './config/database';
import { setupSwagger } from './config/swagger';

const PORT = process.env.PORT || 3333;

const startServer = async () => {
  // Não conecta ao banco se estiver rodando testes
  if (process.env.NODE_ENV !== 'test') {
    await connectDatabase();
  }

  setupSwagger(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`);
    console.log(`📚 Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
};

startServer();