import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var createCookie: (id?: string) => string[];
}

jest.mock('../nats-wrapper'); // use the fake nats-wrapper in __mock__

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

global.createCookie = (id = new mongoose.Types.ObjectId().toHexString()) => {
  const payload = {
    id,
    email: 'test@test.com',
  };
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  const buffer = Buffer.from(JSON.stringify({ jwt: token })).toString('base64');
  return [`session=${buffer}`];
};
