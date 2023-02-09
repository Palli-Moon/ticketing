import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';

const URI = '/api/tickets';
const ID = new mongoose.Types.ObjectId().toHexString();
const COOKIE = global.createCookie;
const title = 'concert';
const price = 20;

it('returns a 404 if the provided id does not exist', async () => {
  await request(app).put(`${URI}/${ID}`).set('Cookie', COOKIE()).send({ title, price }).expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  await request(app).put(`${URI}/${ID}`).send({ title, price }).expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {});

it('returns a 400 if the user provides an invalid title or price', async () => {});

it('updates the ticket provided valid inputs', async () => {});

it('', async () => {});