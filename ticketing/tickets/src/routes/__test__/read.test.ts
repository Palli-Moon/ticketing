import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

const URI = '/api/tickets';
const ID = new mongoose.Types.ObjectId().toHexString();

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get(`${URI}/${ID}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const title = 'concert';
  const price = 20;
  const ticket = new Ticket({ title, price, userId: ID });
  await ticket.save();

  const res = await request(app).get(`${URI}/${ticket._id}`).send().expect(200);
  expect(res.body.title).toEqual(title);
  expect(res.body.price).toEqual(price);
});
