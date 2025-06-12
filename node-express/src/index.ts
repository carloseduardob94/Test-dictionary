import { app } from './app';
import { connectDatabase } from './config/database';
import { setupSwagger } from './config/swagger';

const PORT = process.env.PORT || 3333;

const startServer = async () => {
  await connectDatabase();

  setupSwagger(app);

  app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`);
    console.log(`📚 Swagger disponível em http://localhost:${PORT}/api-docs`);
  });
};

startServer();