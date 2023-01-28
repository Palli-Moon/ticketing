import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';

let mongo: MongoMemoryServer;
mongoose.set('strictQuery', false); // Supress deprecation warning

// before all hook
beforeAll(async () => {
  process.env.JWT_KEY = 'qwerty';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});
