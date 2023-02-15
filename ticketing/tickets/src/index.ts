import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

mongoose.set('strictQuery', false); // Supress deprecation warning

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await natsWrapper.connect('ticketing', 'asdf', 'http://nats-srv:4222');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to database');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => console.log('Listening on port 3000'));
};

start();
