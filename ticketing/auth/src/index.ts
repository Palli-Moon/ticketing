import mongoose from 'mongoose';
import { app } from './app';

mongoose.set('strictQuery', false); // Supress deprecation warning

// This is a change

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log('Listening on port 3000'));
};

start();
