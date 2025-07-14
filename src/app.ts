import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import transactionRoutes from './routes/transactionRoutes';
import { AuthController } from './controllers/authController';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());

// Routes
app.post('/auth/login', AuthController.login);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

// Error handling
app.use(errorHandler);

export default app;