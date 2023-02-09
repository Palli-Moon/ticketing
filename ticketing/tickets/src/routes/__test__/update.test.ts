import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

const URI = '/api/tickets';
const ID = new mongoose.Types.ObjectId().toHexString();
const userId = new mongoose.Types.ObjectId().toHexString();
const title = 'concert';
const price = 20;

const COOKIE = global.createCookie;
const createTicket = async () => {
  const ticket = new Ticket({ title, price, userId });
  await ticket.save();
  return ticket;
};

it('returns a 404 if the provided id does not exist', async () => {
  await request(app).put(`${URI}/${ID}`).set('Cookie', COOKIE()).send({ title, price }).expect(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  await request(app).put(`${URI}/${ID}`).send({ title, price }).expect(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const ticket = await createTicket();

  await request(app).put(`${URI}/${ticket.id}`).set('Cookie', COOKIE()).send({ title, price }).expect(401);
});

it('returns a 400 if the user provides an invalid title or price', async () => {
  const ticket = await createTicket();

  await request(app).put(`${URI}/${ticket.id}`).set('Cookie', COOKIE(userId)).send({ title: '', price }).expect(400);
  await request(app).put(`${URI}/${ticket.id}`).set('Cookie', COOKIE(userId)).send({ title, price: -1 }).expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const ticket = await createTicket();

  await request(app).put(`${URI}/${ticket.id}`).set('Cookie', COOKIE(userId)).send({ title: 'new title', price: 100 }).expect(200);
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.title).toEqual('new title');
  expect(updatedTicket!.price).toEqual(100);
});
