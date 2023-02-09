import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

const URI = '/api/tickets';
const ID = new mongoose.Types.ObjectId().toHexString(); // create valid mongo id
const userId = new mongoose.Types.ObjectId().toHexString();
const title = 'concert';
const price = 20;

const createTicket = async () => {
  const ticket = new Ticket({ title, price, userId });
  await ticket.save();
  return ticket;
};

it('returns a 404 if the ticket is not found', async () => {
  await request(app).get(`${URI}/${ID}`).send().expect(404);
});

it('returns the ticket if the ticket is found', async () => {
  const ticket = await createTicket();
  const res = await request(app).get(`${URI}/${ticket.id}`).send().expect(200);
  expect(res.body.title).toEqual(title);
  expect(res.body.price).toEqual(price);
});

it('can fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const res = await request(app).get(URI).send().expect(200);
  expect(res.body.length).toEqual(3);
});
