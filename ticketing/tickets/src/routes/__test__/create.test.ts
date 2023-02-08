import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/Ticket';

const URI = '/api/tickets';
const COOKIE = global.createCookie;

it('has a route handler listening to /api/tickets for post requests', async () => {
  const res = await request(app).post(URI).send({});
  expect(res.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).post(URI).send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const res = await request(app).post(URI).set('Cookie', COOKIE()).send({});
  expect(res.status).not.toEqual(401);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app).post(URI).set('Cookie', COOKIE()).send({ title: '', price: 10 }).expect(400);
  await request(app).post(URI).set('Cookie', COOKIE()).send({ price: 10 }).expect(400);
});

it('returns an error if an invalid prices is provided', async () => {
  await request(app).post(URI).set('Cookie', COOKIE()).send({ title: 'asdf', price: -10 }).expect(400);
  await request(app).post(URI).set('Cookie', COOKIE()).send({ title: 'asdf' }).expect(400);
});

it('creates a ticket with valid inputs', async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);

  const payload = { title: 'asdf', price: 10 };
  await request(app).post(URI).set('Cookie', COOKIE()).send(payload).expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(payload.title);
  expect(tickets[0].price).toEqual(payload.price);
});
