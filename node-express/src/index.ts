import { app } from './app';
import { connectDatabase } from './config/database';

const PORT = process.env.PORT || 3333;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Server running http://localhost:${PORT}`);
  });
};

startServer();