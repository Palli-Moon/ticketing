import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var createCookie: () => Promise<string[]>;
}

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

global.createCookie = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const res = await request(app).post('/api/users/signup').send({ email, password }).expect(201);
  return res.get('Set-Cookie');
};
