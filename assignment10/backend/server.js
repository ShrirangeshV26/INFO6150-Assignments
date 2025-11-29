import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', jobRoutes);

const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL)
  .then(()=> app.listen(PORT, ()=> console.log('Server running on', PORT)))
  .catch(err=> console.error(err));
