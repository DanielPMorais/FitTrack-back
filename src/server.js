import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import routineRoutes from './routes/routineRoutes.js';
import workoutDayRoutes from './routes/workoutDayRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar ao banco de dados
connectDatabase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'FitTrack API is running' });
});

// Routes
app.use('/api/routines', routineRoutes);
app.use('/api/workout-days', workoutDayRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 FitTrack API server running on http://localhost:${PORT}`);
});

