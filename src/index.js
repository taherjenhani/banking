import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import transactionRoutes from './routes/transactionRoutes.js';
import express from 'express';
import { handleError } from './utils/errorHandler.js';
import { notFound } from './middlewares/validateTransaction.js';


dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.json()); // Placez ceci avant les routes

// Routes
app.use('/api/transactions', transactionRoutes);

// Gestion des erreurs
app.use(notFound);
app.use(handleError);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
