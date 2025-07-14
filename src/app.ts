import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import { AuthController } from './controllers/authController';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the lendsqr wallet-service API, created by Joseph Igbaji', status: 'success' });
});
app.post('/auth/login', AuthController.login);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.use(errorHandler);

export default app;