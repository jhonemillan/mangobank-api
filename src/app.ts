import express from 'express';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';
import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(helmet());
app.get('/', (req, res) => {
    res.send('MangoBank API');
  });
app.use('/users', userRoutes);
app.use(errorHandler);

export default app;